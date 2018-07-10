import { Router } from 'express';
import { createArtist, getArtistList, getArtistById, updateArtistById, deleteArtistById } from './artist.api';

const artistRoute = Router();

artistRoute.post('', createArtist);
artistRoute.get('',getArtistList);
artistRoute.get('/:id',getArtistById);
artistRoute.put('/:id',updateArtistById);
artistRoute.delete('/:id',deleteArtistById);

export default artistRoute;
