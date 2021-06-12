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
var routes = express_1.Router();
var upload = multer_1.default(upload_1.default);
routes.post('/companies', upload.single('logo'), CompaniesController_1.default.create);
routes.get('/companies', CompaniesController_1.default.index);
routes.get('/companies/:id', CompaniesController_1.default.show);
routes.put('/companies/:id', upload.single('logo'), CompaniesController_1.default.update);
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
routes.get('/categories/:id', SegmentController_1.default.show);
routes.post('/products', upload.single('image'), ProductsController_1.default.create);
routes.get('/products', ProductsController_1.default.index);
routes.get('/products/:id', ProductsController_1.default.show);
routes.put('/products/:id', upload.single('image'), ProductsController_1.default.update);
routes.delete('/products/:id', ProductsController_1.default.delete);
exports.default = routes;
