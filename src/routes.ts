import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import CompaniesController from './controllers/CompaniesController';
import SegmentController from './controllers/SegmentController';
import CategoriesController from './controllers/CategoriesController';
import ProductsController from './controllers/ProductsController';

const routes = Router();

const upload = multer(uploadConfig)

routes.post('/companies',upload.single('logo'),CompaniesController.create)
routes.get('/companies',CompaniesController.index)
routes.get('/companies/:id',CompaniesController.show)
routes.put('/companies/:id',upload.single('logo'),CompaniesController.update)
routes.delete('/companies/:id',CompaniesController.delete)

routes.post('/segments',SegmentController.create)
routes.get('/segments',SegmentController.index)
routes.get('/segments/:id',SegmentController.show)
routes.put('/segments/:id',SegmentController.update)
routes.delete('/segments/:id',SegmentController.delete)

routes.post('/categories',CategoriesController.create)
routes.get('/categories',CategoriesController.index)
routes.put('/categories/:id',CategoriesController.update)
routes.get('/categories/:id',CategoriesController.show)
routes.get('/categories/:id',SegmentController.show)

routes.post('/products',upload.single('image'),ProductsController.create)
routes.get('/products',ProductsController.index)
routes.get('/products/:id',ProductsController.show)
routes.put('/products/:id',upload.single('image'),ProductsController.update)
routes.delete('/products/:id',ProductsController.delete)


export default routes