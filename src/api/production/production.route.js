import { Router } from 'express';
import { getProductionList, getProductionAlbumsByProductId } from './production.api';

const productionsRoutePublic = Router();
const END_POINT = '/productions';

productionsRoutePublic.get(END_POINT, getProductionList);
productionsRoutePublic.get('/:productionId/albums', getProductionAlbumsByProductId);

export default productionsRoutePublic;
