import { Albums } from '../../../models/album';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/metadata-of-query';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const createAlbum = async (req, res) => {
  const { name, image, production_id } = req.body;
  const album = new Albums({ name, image, production_id });
  const result = await album.save();
  succeed(res, result, 200);
};

export const getAlbumList = async (req, res) => {
  let { limit = 10, offset = 0, status, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByStatus = status ? { status } : { status: 'active' };
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, ...filterByStatus };
  const { rows, count } = await Albums.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getAlbumById = async (req, res) => {
  const { id } = req.params;
  const rows = await Albums.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateAlbumById = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Albums.update(data, { where: { id, status: 'active' } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteAlbumById = async (req, res) => {
  const { id } = req.params;
  await Albums.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
