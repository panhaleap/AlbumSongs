import { ArtistSongs } from '../../../models/artist-song';
import { succeed, failed } from '../../../common/response';
import { getLimit, getOffset } from '../../../common/metadata-of-query';
import { Artists } from '../../../models/artist';

export const createArtistSong = async (req, res) => {
  try {
    const { artistId, songId } = req.body;
    const artistSong = new ArtistSongs({ artistId, songId });
    const result = await artistSong.save();
    succeed(res, result, 200);
  } catch (error) {
    //failed(res, {Error: error.errors[0].type}, 400);
    failed(res, { message: 'Input validation' }, 400);
  }
};

export const getArtistSongList = async (req, res) => {
  let { limit = 10, offset = 0, artistId, songId } = req.query;
  limit = getLimit(limit);
  offset = getOffset(offset);
  const filterByArtistId = artistId ? { artistId } : {};
  const filterBySongId = songId ? { songId } : {};

  const where = { ...filterByArtistId, ...filterBySongId, status: 'active' };
  const { rows, count } = await ArtistSongs.findAndCountAll({ where, offset, limit });
  succeed(res, { data: rows, metadata: { limit, offset, total: count } }, 200);
};

export const getArtistSongByArtistIdSongId = async (req, res) => {
  const { artistId, songId } = req.params;
  const rows = await ArtistSongs.findAll({ where: { artistId, songId, status: 'active' } });
  succeed(res, { data: rows }, 200);
};

export const updateArtistSongByArtistIdSongId = async (req, res) => {
  try {
    const { artistId, songId } = req.params;
    const data = req.body;
    const artistSong = await ArtistSongs.findOne({ where: {
        artistId, songId
    }});
    if(!artistSong) {
        throw new Error('Invalid song id or artist id');
    }
    if (artistSong.status !== 'active')
        throw new Error('Song id and artist id is inactive');
    const checkArtist = await Artists.findOne({where: {
        id: data.artistId
    }});
    if(!checkArtist)
        throw new Error('Invalid artist id');

    if(data.artistId !== artistId || data.songId !== songId) {
        const checkartistSong = await ArtistSongs.findOne({where: {
            artistId: data.artistId,
            songId: data.songId
        }});
        if (checkartistSong)
            throw new Error('artist id and song id are already exist');
    }

    await ArtistSongs.update({
        status: data.status,
        artistId: data.artistId,
        songId: data.songId
    }, { where: { artistId, songId, status: 'active' } });
    succeed(res, { message: 'Updated Success' }, 200);
  } catch (error) {
      console.log('eror ===', error);
    failed(res, error.message, 400);
  }
};

export const deleteArtistSongByArtistIdSongId = async (req, res) => {
    const { artistId, songId } = req.params;
  await ArtistSongs.update({ status: 'inactive' }, { where: { artistId, songId, status: 'active' } });
  succeed(res, { message: 'Deleted Success' }, 200);
};
