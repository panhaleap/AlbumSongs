import { Router } from 'express';
import { getProductionList, getProductionById } from './production.api';

const productionsRoutePublic = Router();
const END_POINT = '/productions';

productionsRoutePublic.get(END_POINT, getProductionList);
productionsRoutePublic.get('/:productionId/', getProductionById);

export default productionsRoutePublic;
