import { Productions } from '../../models/production';
import { succeed, failed } from '../../common/response';
import { getLimit, getOffset } from '../../common/metadata-of-query';
import { sequelize } from '../../sequelize-connection';
import Sequelize from 'sequelize';
import { readFileSync } from 'fs';
import { resolve } from 'path';
const sql = readFileSync(resolve(__dirname, '../../queries/album/get-albums-production.sql'));
import * as format from 'string-template';
const Op = Sequelize.Op;

export const getProductionList = async (req, res) => {
  let { limit = 10, offset = 0, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);

  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};
  const where = { ...filterByName, status: 'active' };

  const { rows, count } = await Productions.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getProductionAlbumsByProductId = async (req, res) => {
  try {
    let { albumName, limit = 10, offset = 0 } = req.query;
    limit = getLimit(limit);
    offset = getOffset(offset);
    const { productionId } = req.params;

    const filterProductId = productionId ? ` and productions.id = :productionId ` : '';
    const filterAlbumName = albumName ? ` and albums.name like ':albumName' ` : '';

    const query = format(sql, {
      filterProductId,
      filterAlbumName,
      limit,
      offset
    });

    const rows = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: {
        productionId,
        albumName
      }
    });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error.message, 500);
  }
};
