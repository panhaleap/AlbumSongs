import { Router } from 'express';
import { getArtistList } from './artist.api';

const artistRoutePublic = Router();

artistRoutePublic.get('/artists', getArtistList);

export default artistRoutePublic;
