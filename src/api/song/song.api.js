import { Songs } from '../../models/song';
import { getQuerySongForPublic } from '../../common/raw_query';
import { succeed, failed } from '../../common/response';
import { getLimit, getOffset, getSongPublicCondition } from '../../common/query_condition';
const { sequelize } = require('../../sequelize-connection');
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

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

export const getSongById1 = async (req, res) => {
  const { id } = req.params;
  const rows = await Songs.findAll({ where: { id, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const getSongById = async (req, res) => {
  try {
    let { songId, artistId, songName, artistType, album_id, limit = 10, offset = 0 } = req.query;
    limit = getLimit(limit);
    offset = getOffset(offset);

    let query = getQuerySongForPublic();
    query = getSongPublicCondition(query, songId, artistId, songName, artistType, album_id, limit, offset);

    // query = songId ? query + ` and songs.id = $songId ` : query;
    // query = artistId ? query + ` and artists.id = $artistId ` : query;
    // query = songName ? query + ` and songs.name like $songName ` : query;
    // query = artistType ? query + ` and artists.type = $artistType ` : query;
    // query = album_id ? query + ` and songs.album_id = $album_id ` : query;
    // query = query + ` LIMIT $limit OFFSET $offset `;

    const rows = await sequelize.query(query, {type: Sequelize.QueryTypes.SELECT});

    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error, 500);
  }
};
