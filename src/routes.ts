import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import authMiddleware from './middlewares/authMiddleware';

import CompaniesController from './controllers/CompaniesController';
import SegmentController from './controllers/SegmentController';
import CategoriesController from './controllers/CategoriesController';
import ProductsController from './controllers/ProductsController';
import SalesmansController from './controllers/SalesmansController';
import UsersController from './controllers/UsersController';
import CouponsController from './controllers/CouponsController';
import CustomersController from './controllers/CustomersController';
import OrdersController from './controllers/OrdersController';
import CitiesController from './controllers/CitiesController';
import DashboardController from './controllers/DashboardController';
import StoreController from './controllers/StoreController';

const routes = Router();

const upload = multer(uploadConfig)

routes.post('/companies',authMiddleware,upload.single('logo'),CompaniesController.create)
routes.get('/companies',authMiddleware,CompaniesController.index)
routes.get('/companies/searchCompanies',CompaniesController.searchCompanies)
//routes.get('/companies/filterCities',CompaniesController.filterCities)
routes.get('/companies/:id',CompaniesController.show)
routes.put('/companies/:id',upload.single('logo'),CompaniesController.update)
routes.get('/products/companies/:id',CompaniesController.listProducts)
routes.delete('/companies/:id',CompaniesController.delete)

routes.get('/loja',StoreController.products);


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

routes.post('/products',authMiddleware,upload.single('image'),ProductsController.create)
routes.get('/products',authMiddleware,ProductsController.index)
routes.get('/products/:id',authMiddleware,ProductsController.show)
routes.put('/products/:id',authMiddleware,upload.single('image'),ProductsController.update)
routes.delete('/products/:id',authMiddleware,ProductsController.delete)

routes.post('/salesmans',SalesmansController.create)
routes.get('/salesmans',SalesmansController.index)
routes.put('/salesmans/:id',SalesmansController.update)
routes.get('/salesmans/:id',SalesmansController.show)
routes.delete('/salesmans/:id',SalesmansController.delete)

routes.post('/users',UsersController.create)
routes.get('/users',authMiddleware,UsersController.index)
routes.put('/users/:id',UsersController.update)
routes.get('/users/:id',UsersController.show)
routes.put('/users/inactivate/:id',UsersController.inactivate)
routes.put('/users/activate/:id',UsersController.activate)
routes.post('/users/sendMailIndication',UsersController.sendMailIndication)

routes.post('/coupons',CouponsController.create)
routes.get('/coupons',CouponsController.index)
routes.put('/coupons/:id',CouponsController.update)
routes.get('/coupons/:id',CouponsController.show)
routes.delete('/coupons/:id',CouponsController.delete)
routes.get('/coupons/products/:id',CouponsController.listCoupons)

routes.post('/authenticate',UsersController.authenticate);


routes.post('/customers',CustomersController.create);
routes.post('/customers/signUp',CustomersController.signUp);
routes.put('/customers/:id',CustomersController.update)
routes.get('/customers/:id',CustomersController.show)
routes.get('/customers',CustomersController.index);
routes.get('/customers/:id/orders',CustomersController.orders);
routes.get('/customers/:id/account',CustomersController.account);

routes.post('/orders',OrdersController.create);
routes.get('/orders',OrdersController.index);
routes.get('/orders/:id/detail',OrdersController.detail);
routes.put('/orders/cancel/:id',OrdersController.cancel);
routes.put('/orders/approve/:id',OrdersController.approve);
routes.get('/orders/:id',OrdersController.show)
routes.post('/orders/sendMailNewOrder',OrdersController.sendMailNewOrder)

routes.get('/finances/:id',DashboardController.finance)

routes.get('/cities',CitiesController.index)

export default routes