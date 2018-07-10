import { Songs } from '../../../models/song';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/query_condition';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const createSong = async (req, res) => {
  const { name, duration, size, album_id, category_id } = req.body;
  const song = new Songs({ name, duration, size, album_id, category_id });
  const result = await song.save();
  succeed(res, result, 200);
};

export const getSongList = async (req, res) => {
  let { limit = 10, offset = 0, status, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByStatus = status ? { status } : { status: 'active' };
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, ...filterByStatus };
  const { rows, count } = await Songs.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getSongById = async (req, res) => {
  const { id } = req.params;
  const rows = await Songs.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateSongById = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Songs.update(data, { where: { id, status: 'active' } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteSongById = async (req, res) => {
  const { id } = req.params;
  await Songs.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
