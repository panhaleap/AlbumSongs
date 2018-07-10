import { Router } from 'express';
import { createAlbum, getAlbumList, getAlbumById, updateAlbumById, deleteAlbumById } from './album.api';

const albumRoute = Router();

albumRoute.post('', createAlbum);
albumRoute.get('',getAlbumList);
albumRoute.get('/:id',getAlbumById);
albumRoute.put('/:id',updateAlbumById);
albumRoute.delete('/:id',deleteAlbumById);

export default albumRoute;
