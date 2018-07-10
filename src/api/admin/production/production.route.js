import { Router } from 'express';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';
import { createProduction, getProductionList, getScoreById, updateScoreById, deleteScoreById } from './production.api';

const productionRoute = Router();

productionRoute.post('',createProduction);
productionRoute.get('',getProductionList);

export default productionRoute;
