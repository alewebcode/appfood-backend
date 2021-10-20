"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("./config/upload"));
var authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
var CompaniesController_1 = __importDefault(require("./controllers/CompaniesController"));
var SegmentController_1 = __importDefault(require("./controllers/SegmentController"));
var CategoriesController_1 = __importDefault(require("./controllers/CategoriesController"));
var ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
var SalesmansController_1 = __importDefault(require("./controllers/SalesmansController"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var CouponsController_1 = __importDefault(require("./controllers/CouponsController"));
var CustomersController_1 = __importDefault(require("./controllers/CustomersController"));
var OrdersController_1 = __importDefault(require("./controllers/OrdersController"));
var CitiesController_1 = __importDefault(require("./controllers/CitiesController"));
var DashboardController_1 = __importDefault(require("./controllers/DashboardController"));
var StoreController_1 = __importDefault(require("./controllers/StoreController"));
var routes = express_1.Router();
var upload = multer_1.default(upload_1.default);
routes.post('/companies', authMiddleware_1.default, upload.single('logo'), CompaniesController_1.default.create);
routes.get('/companies', authMiddleware_1.default, CompaniesController_1.default.index);
routes.get('/companies/searchCompanies', CompaniesController_1.default.searchCompanies);
//routes.get('/companies/filterCities',CompaniesController.filterCities)
routes.get('/companies/:id', CompaniesController_1.default.show);
routes.put('/companies/:id', upload.single('logo'), CompaniesController_1.default.update);
routes.get('/products/companies/:id', CompaniesController_1.default.listProducts);
routes.delete('/companies/:id', CompaniesController_1.default.delete);
routes.get('/loja', StoreController_1.default.products);
routes.post('/segments', SegmentController_1.default.create);
routes.get('/segments', SegmentController_1.default.index);
routes.get('/segments/:id', SegmentController_1.default.show);
routes.put('/segments/:id', SegmentController_1.default.update);
routes.delete('/segments/:id', SegmentController_1.default.delete);
routes.post('/categories', CategoriesController_1.default.create);
routes.get('/categories', CategoriesController_1.default.index);
routes.put('/categories/:id', CategoriesController_1.default.update);
routes.get('/categories/:id', CategoriesController_1.default.show);
routes.delete('/categories/:id', CategoriesController_1.default.delete);
routes.post('/products', authMiddleware_1.default, upload.single('image'), ProductsController_1.default.create);
routes.get('/products', authMiddleware_1.default, ProductsController_1.default.index);
routes.get('/products/:id', authMiddleware_1.default, ProductsController_1.default.show);
routes.put('/products/:id', authMiddleware_1.default, upload.single('image'), ProductsController_1.default.update);
routes.delete('/products/:id', authMiddleware_1.default, ProductsController_1.default.delete);
routes.post('/salesmans', SalesmansController_1.default.create);
routes.get('/salesmans', SalesmansController_1.default.index);
routes.put('/salesmans/:id', SalesmansController_1.default.update);
routes.get('/salesmans/:id', SalesmansController_1.default.show);
routes.delete('/salesmans/:id', SalesmansController_1.default.delete);
routes.post('/users', UsersController_1.default.create);
routes.get('/users', authMiddleware_1.default, UsersController_1.default.index);
routes.put('/users/:id', UsersController_1.default.update);
routes.get('/users/:id', UsersController_1.default.show);
routes.put('/users/inactivate/:id', UsersController_1.default.inactivate);
routes.put('/users/activate/:id', UsersController_1.default.activate);
routes.post('/users/sendMailIndication', UsersController_1.default.sendMailIndication);
routes.post('/coupons', CouponsController_1.default.create);
routes.get('/coupons', CouponsController_1.default.index);
routes.put('/coupons/:id', CouponsController_1.default.update);
routes.get('/coupons/:id', CouponsController_1.default.show);
routes.delete('/coupons/:id', CouponsController_1.default.delete);
routes.get('/coupons/products/:id', CouponsController_1.default.listCoupons);
routes.post('/authenticate', UsersController_1.default.authenticate);
routes.post('/customers', CustomersController_1.default.create);
routes.post('/customers/signUp', CustomersController_1.default.signUp);
routes.put('/customers/:id', CustomersController_1.default.update);
routes.get('/customers/:id', CustomersController_1.default.show);
routes.get('/customers', CustomersController_1.default.index);
routes.get('/customers/:id/orders', CustomersController_1.default.orders);
routes.get('/customers/:id/account', CustomersController_1.default.account);
routes.post('/orders', OrdersController_1.default.create);
routes.get('/orders', OrdersController_1.default.index);
routes.get('/orders/:id/detail', OrdersController_1.default.detail);
routes.put('/orders/cancel/:id', OrdersController_1.default.cancel);
routes.put('/orders/approve/:id', OrdersController_1.default.approve);
routes.get('/orders/:id', OrdersController_1.default.show);
routes.post('/orders/sendMailNewOrder', OrdersController_1.default.sendMailNewOrder);
routes.get('/finances/:id', DashboardController_1.default.finance);
routes.get('/cities', CitiesController_1.default.index);
exports.default = routes;
