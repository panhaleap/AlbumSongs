import { Productions } from '../../models/production';
import { succeed } from '../../common/response';
import { getLimit, getOffset } from '../../common/query_condition';
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

export const getProductionById = async (req, res) => {
  const { productionId } = req.params;
  const rows = await Productions.findAll({ where: { productionId, status: 'active' } });
  succeed(res, { data: rows }, 200);
};
