import { Router } from 'express';
import { createSong, getSongList, getSongById, updateSongById, deleteSongById } from './song.api';

const songRoute = Router();

songRoute.post('', createSong);
songRoute.get('',getSongList);
songRoute.get('/:id',getSongById);
songRoute.put('/:id',updateSongById);
songRoute.delete('/:id',deleteSongById);

export default songRoute;
