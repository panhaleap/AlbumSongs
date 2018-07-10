import { Router } from 'express';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';
import { createProduction, getProductionList, getProductionById, updateProductionById, deleteProductionById } from './production.api';

const productionRoute = Router();

productionRoute.post('', createProduction);
productionRoute.get('',getProductionList);
productionRoute.get('/:id',getProductionById);
productionRoute.put('/:id',updateProductionById);
productionRoute.delete('/:id',deleteProductionById);

export default productionRoute;
