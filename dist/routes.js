"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("./config/upload"));
var CompaniesController_1 = __importDefault(require("./controllers/CompaniesController"));
var SegmentController_1 = __importDefault(require("./controllers/SegmentController"));
var CategoriesController_1 = __importDefault(require("./controllers/CategoriesController"));
var ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
var SalesmansController_1 = __importDefault(require("./controllers/SalesmansController"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var CouponsController_1 = __importDefault(require("./controllers/CouponsController"));
var routes = express_1.Router();
var upload = multer_1.default(upload_1.default);
routes.post('/companies', upload.single('logo'), CompaniesController_1.default.create);
routes.get('/companies', CompaniesController_1.default.index);
routes.get('/companies/searchCompanies', CompaniesController_1.default.searchCompanies);
routes.get('/companies/filterCities', CompaniesController_1.default.filterCities);
routes.get('/companies/:id', CompaniesController_1.default.show);
routes.put('/companies/:id', upload.single('logo'), CompaniesController_1.default.update);
routes.get('/products/companies/:id', CompaniesController_1.default.listProducts);
routes.delete('/companies/:id', CompaniesController_1.default.delete);
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
routes.post('/products', upload.single('image'), ProductsController_1.default.create);
routes.get('/products', ProductsController_1.default.index);
routes.get('/products/:id', ProductsController_1.default.show);
routes.put('/products/:id', upload.single('image'), ProductsController_1.default.update);
routes.delete('/products/:id', ProductsController_1.default.delete);
routes.post('/salesmans', SalesmansController_1.default.create);
routes.get('/salesmans', SalesmansController_1.default.index);
routes.put('/salesmans/:id', SalesmansController_1.default.update);
routes.get('/salesmans/:id', SalesmansController_1.default.show);
routes.delete('/salesmans/:id', SalesmansController_1.default.delete);
routes.post('/users', UsersController_1.default.create);
routes.get('/users', UsersController_1.default.index);
routes.put('/users/:id', UsersController_1.default.update);
routes.get('/users/:id', UsersController_1.default.show);
routes.put('/users/inactivate/:id', UsersController_1.default.inactivate);
routes.put('/users/activate/:id', UsersController_1.default.activate);
routes.post('/coupons', CouponsController_1.default.create);
routes.get('/coupons', CouponsController_1.default.index);
routes.put('/coupons/:id', CouponsController_1.default.update);
routes.get('/coupons/:id', CouponsController_1.default.show);
routes.delete('/coupons/:id', CouponsController_1.default.delete);
exports.default = routes;
