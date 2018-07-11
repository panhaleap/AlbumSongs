import { getQuerySongForPublic } from '../../common/raw_query';
import { succeed, failed } from '../../common/response';
import {
  getLimit,
  getOffset,
  getSongPublicCondition,
  getSongPublicConditionBySongId
} from '../../common/query_condition';
const { sequelize } = require('../../sequelize-connection');
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const getSongList = async (req, res) => {
  try {
    let { songId, artistId, songName, artistType, album_id, limit = 10, offset = 0 } = req.query;
    limit = getLimit(limit);
    offset = getOffset(offset);

    let query = getQuerySongForPublic();
    query = getSongPublicCondition(query, songId, artistId, songName, artistType, album_id, limit, offset);

    const rows = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error, 500);
  }
};

export const getSongById = async (req, res) => {
  try {
    let { songId } = req.params;
    let query = getQuerySongForPublic();
    query = getSongPublicConditionBySongId(query, songId);

    const rows = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    succeed(res, { data: rows }, 200);
  } catch (error) {
    failed(res, error, 500);
  }
};
