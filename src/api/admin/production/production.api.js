import { Productions } from '../../../models/production';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/metadata-of-query';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const createProduction = async (req, res) => {
  const { name, logo } = req.body;
  const production = new Productions({ name, logo });
  const result = await production.save();
  succeed(res, result, 200);
};

export const getProductionList = async (req, res) => {
  let { limit = 10, offset = 0, status, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByStatus = status ? { status } : { status: 'active' };
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, ...filterByStatus };
  const { rows, count } = await Productions.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getProductionById = async (req, res) => {
  const { id } = req.params;
  const rows = await Productions.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateProductionById = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Productions.update(data, { where: { id, status: 'active' } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteProductionById = async (req, res) => {
  const { id } = req.params;
  await Productions.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
