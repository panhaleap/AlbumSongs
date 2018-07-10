import { Songs } from '../../../models/song';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/query_condition';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const createSong = async (req, res) => {
  const { name, type, image } = req.body;
  const song = new Songs({ name, type, image });
  const result = await song.save();
  succeed(res, result, 200);
};

export const getArtistList = async (req, res) => {
  let { limit = 10, offset = 0, status, name } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByStatus = status ? { status } : { status: 'active' };
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, ...filterByStatus };
  const { rows, count } = await Artists.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getArtistById = async (req, res) => {
  const { id } = req.params;
  const rows = await Artists.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateArtistById = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Artists.update(data, { where: { id, status: 'active' } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteArtistById = async (req, res) => {
  const { id } = req.params;
  await Artists.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
