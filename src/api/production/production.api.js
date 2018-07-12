import { Productions } from '../../models/production';
import { getQueryAlbumOfProductionForPublic } from '../../common/raw_query';
import { getAlbumOfProductionCondition } from '../../common/query_condition';
import { succeed, failed } from '../../common/response';
import { getLimit, getOffset } from '../../common/query_condition';
import { sequelize } from '../../sequelize-connection';
import Sequelize from 'sequelize';
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
    let query = getQueryAlbumOfProductionForPublic();
    query = getAlbumOfProductionCondition(query, productionId, albumName, limit, offset);

    const rows = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error.message, 500);
  }
};
