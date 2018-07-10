import { Categories } from '../../../models/category';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/query_condition';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Categories({ name });
  const result = await category.save();
  succeed(res, result, 200);
};

export const getCategoryList = async (req, res) => {
  let { limit = 10, offset = 0, status, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByStatus = status ? { status } : { status: 'active' };
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, ...filterByStatus };
  const { rows, count } = await Categories.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const rows = await Categories.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateCategoryById = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Categories.update(data, { where: { id, status: 'active' } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  await Categories.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
