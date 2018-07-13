import { Artists } from '../../models/artist';
import { succeed } from '../../common/response';
import { getLimit, getOffset } from '../../common/metadata-of-query';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const getArtistList = async (req, res) => {
  let { limit = 10, offset = 0, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, status: 'active' };
  const { rows, count } = await Artists.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};
