import { Router } from 'express';
import {
  createPlayList,
  getPlaylistList,
  addSongsBySongIds,
  deleteSongById,
  deletePlaylistById
} from './playlist.api';

const playlistRoute = Router();

playlistRoute.post('', createPlayList);
playlistRoute.get('/users/:userId', getPlaylistList);
playlistRoute.post('/:playlistId/songs/:songId',addSongsBySongIds);
playlistRoute.delete('/:playlistId/songs/:songId',deleteSongById);
playlistRoute.delete('/:id', deletePlaylistById);

export default playlistRoute;
