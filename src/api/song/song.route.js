import { Router } from 'express';
import { getSongList, getSongById } from './song.api';

const songRoutePublic = Router();
const ENDPOINT = '/songs';

//songRoutePublic.get(ENDPOINT,getSongList);
songRoutePublic.get(ENDPOINT,getSongById);
export default songRoutePublic;