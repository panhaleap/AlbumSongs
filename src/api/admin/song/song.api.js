import { Songs } from '../../../models/song';
import { succeed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/metadata-of-query';
import Sequelize from 'sequelize';
import { ArtistSongs } from '../../../models/artist-song';
import { Artists } from '../../../models/artist';
const Op = Sequelize.Op;

export const createSong = async (req, res) => {
  const { name, duration, size, album_id, category_id, artistId } = req.body;
  const newSong = await Songs.create({ name, duration, size, album_id, category_id });

  await ArtistSongs.create({ songId: newSong.id, artistId});
  const result = await Songs.findOne({where: {id: newSong.id}, include: [{ model: Artists}]});
  succeed(res, {data: result}, 200);
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
  const { name, duration, size, album_id, category_id, artistId } = req.body;
  const { id } = req.params;
  await Songs.update({ name, duration, size, album_id, category_id }, { where: { id, status: 'active' } });
  await ArtistSongs.update({ artistId }, { where: { songId: id } });
  succeed(res, { message: 'Updated Success' }, 200);
};

export const deleteSongById = async (req, res) => {
  const { id } = req.params;
  await Songs.update({ status: 'inactive' }, { where: { id, status: 'active' } });
  await ArtistSongs.update({ status: 'inactive' }, { where: { songId: id } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
