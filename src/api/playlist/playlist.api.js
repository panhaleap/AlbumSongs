import { Songs } from '../../models/song';
import { succeed } from '../../common/response';
import { getLimit, getOffset } from '../../common/metadata-of-query';
import Sequelize from 'sequelize';
import { Playlists } from '../../models/playlist';
import { PlaylistSong } from '../../models/palylist-song';
const Op = Sequelize.Op;

export const createPlayList = async (req, res) => {
  const { name, songId } = req.body;
  const newPlaylist = await Playlists.create({ name });

  if (songId) await PlaylistSong.create({ songId, playlistId: newPlaylist.id });

  const result = await Playlists.findOne({ where: { id: newPlaylist.id }, include: [{ model: Songs }] });
  succeed(res, { data: result }, 200);
};

export const getPlaylistList = async (req, res) => {
  let { limit = 10, offset = 0, name } = req.query;
  const { userId } = req.params;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByName = name ? { name: { [Op.like]: `%${name}%` } } : {};

  const where = { ...filterByName, userId };
  //const { rows, count } = await Playlists.findAndCountAll({ where, include: [{ model: Songs }], offset, limit });
  const { rows, count } = await Playlists.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const deletePlaylistById = async (req, res) => {
  const { id } = req.params;
  await Playlists.destroy({ where: { id } });
  await PlaylistSong.destroy({ where: { playlistId: id } });
  succeed(res, { message: 'Deleted Success' }, 200);
};

export const addSongsBySongIds = async (req, res) => {
  const { playlistId, songId } = req.params;

  await PlaylistSong.create({ songId, playlistId });

  const result = await Playlists.findOne({ where: { id: playlistId }, include: [{ model: Songs }] });
  succeed(res, { data: result }, 200);
};

export const deleteSongById = async (req, res) => {
  const { playlistId, songId } = req.params;
  await PlaylistSong.destroy({ where: { playlistId, songId } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
