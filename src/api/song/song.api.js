import { succeed, failed } from '../../common/response';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as format from 'string-template';
import { getLimit, getOffset } from '../../common/metadata-of-query';
const { sequelize } = require('../../sequelize-connection');
import Sequelize from 'sequelize';
const sql = readFileSync(resolve(__dirname, '../../queries/song/get-song-artist-category.sql'));

export const getSongList = async (req, res) => {
  try {
    let { songId, artistId, songName, artistType, albumId, limit = 10, offset = 0 } = req.query;
    limit = getLimit(limit);
    offset = getOffset(offset);

    const filterSongId = songId ? ' AND s.id = :songId ' : '';
    const filterArtistId = artistId ? ' AND a.id = :artistId ' : '';
    const filterSongName = songName ? ` AND s.name like %:songName% ` : '';
    const filterArtistType = artistType ? ` AND a.type = ':artistType}' ` : '';
    const filterAlbumId = albumId ? ` AND s.album_id = :albumId ` : '';

    const query = format(sql, {
      filterSongId,
      filterArtistId,
      filterSongName,
      filterArtistType,
      filterAlbumId
    });

    const rows = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: {
        songId,
        artistId,
        songName,
        artistType,
        albumId,
        limit,
        offset
      }
    });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error, 500);
  }
};

export const getSongById = async (req, res) => {
  try {
    let { songId } = req.params;
    let query = sql;
    const filterSongId = songId;

    const rows = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: {
        filterSongId
      }
    });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error, 500);
  }
};
