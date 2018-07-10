import { Router } from 'express';
import { createCategory, getCategoryList, getCategoryById, updateCategoryById, deleteCategoryById } from './category.api';

const categoryRoute = Router();

categoryRoute.post('', createCategory);
categoryRoute.get('',getCategoryList);
categoryRoute.get('/:id',getCategoryById);
categoryRoute.put('/:id',updateCategoryById);
categoryRoute.delete('/:id',deleteCategoryById);

export default categoryRoute;
