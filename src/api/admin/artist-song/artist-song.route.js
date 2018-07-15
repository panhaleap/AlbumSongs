import { Router } from 'express';
import {
  createArtistSong,
  getArtistSongList,
  getArtistSongByArtistIdSongId,
  updateArtistSongByArtistIdSongId,
  deleteArtistSongByArtistIdSongId
} from './artist-song.api';

const artistSongRoute = Router();

artistSongRoute.post('', createArtistSong);
artistSongRoute.get('', getArtistSongList);
artistSongRoute.get('/artist/:artistId/song/:songId', getArtistSongByArtistIdSongId);
artistSongRoute.put('/artist/:artistId/song/:songId', updateArtistSongByArtistIdSongId);
artistSongRoute.delete('/artist/:artistId/song/:songId', deleteArtistSongByArtistIdSongId);

export default artistSongRoute;
