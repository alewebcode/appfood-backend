import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import CompaniesController from './controllers/CompaniesController';
import SegmentController from './controllers/SegmentController';
import CategoriesController from './controllers/CategoriesController';
import ProductsController from './controllers/ProductsController';
import SalesmansController from './controllers/SalesmansController';
import UsersController from './controllers/UsersController';
import CouponsController from './controllers/CouponsController';

const routes = Router();

const upload = multer(uploadConfig)

routes.post('/companies',upload.single('logo'),CompaniesController.create)
routes.get('/companies',CompaniesController.index)
routes.get('/companies/searchCompanies',CompaniesController.searchCompanies)
routes.get('/companies/filterCities',CompaniesController.filterCities)
routes.get('/companies/:id',CompaniesController.show)
routes.put('/companies/:id',upload.single('logo'),CompaniesController.update)
routes.get('/products/companies/:id',CompaniesController.listProducts)
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
routes.delete('/categories/:id',CategoriesController.delete)

routes.post('/products',upload.single('image'),ProductsController.create)
routes.get('/products',ProductsController.index)
routes.get('/products/:id',ProductsController.show)
routes.put('/products/:id',upload.single('image'),ProductsController.update)
routes.delete('/products/:id',ProductsController.delete)

routes.post('/salesmans',SalesmansController.create)
routes.get('/salesmans',SalesmansController.index)
routes.put('/salesmans/:id',SalesmansController.update)
routes.get('/salesmans/:id',SalesmansController.show)
routes.delete('/salesmans/:id',SalesmansController.delete)

routes.post('/users',UsersController.create)
routes.get('/users',UsersController.index)
routes.put('/users/:id',UsersController.update)
routes.get('/users/:id',UsersController.show)
routes.put('/users/inactivate/:id',UsersController.inactivate)
routes.put('/users/activate/:id',UsersController.activate)

routes.post('/coupons',CouponsController.create)
routes.get('/coupons',CouponsController.index)
routes.put('/coupons/:id',CouponsController.update)
routes.get('/coupons/:id',CouponsController.show)
routes.delete('/coupons/:id',CouponsController.delete)

export default routes