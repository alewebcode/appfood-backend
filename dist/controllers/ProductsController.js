"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Product_1 = require("../models/Product");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepository, _a, page, limit, offset, totalResults, filter, products, result, productsRepository_1, products;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productsRepository = typeorm_1.getRepository(Product_1.Product);
                        if (!request.query) return [3 /*break*/, 3];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, productsRepository.count()
                            //console.log(totalResults)
                        ];
                    case 1:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, productsRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 2:
                        products = _b.sent();
                        result = {
                            totalResults: totalResults,
                            products: products
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 3:
                        productsRepository_1 = typeorm_1.getRepository(Product_1.Product);
                        return [4 /*yield*/, productsRepository_1.find()];
                    case 4:
                        products = _b.sent();
                        return [2 /*return*/, response.status(201).json(products)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, price, category, company, productRepository, requestImage, file, data, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, price = _a.price, category = _a.category, company = _a.company;
                        productRepository = typeorm_1.getRepository(Product_1.Product);
                        requestImage = request.file;
                        file = requestImage ? requestImage.filename : '';
                        data = {
                            name: name,
                            description: description,
                            price: price,
                            category: category,
                            company: company,
                            image: file
                        };
                        product = productRepository.create(data);
                        return [4 /*yield*/, productRepository.save(product)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productRepository, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        productRepository = typeorm_1.getRepository(Product_1.Product);
                        return [4 /*yield*/, productRepository.findOneOrFail(id, {
                                relations: ['category']
                            })];
                    case 1:
                        product = _a.sent();
                        //console.log(product.logo)
                        product.image = "http://192.168.0.103:3333/uploads/" + product.image;
                        console.log(product);
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productRepository, product, _a, name, description, price, category, requestImage, file, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        productRepository = typeorm_1.getRepository(Product_1.Product);
                        return [4 /*yield*/, productRepository.findOneOrFail(id)];
                    case 1:
                        product = _b.sent();
                        _a = request.body, name = _a.name, description = _a.description, price = _a.price, category = _a.category;
                        requestImage = request.file;
                        file = requestImage ? requestImage.filename : product.image;
                        data = {
                            name: name,
                            description: description,
                            price: price,
                            category: category,
                            image: file
                        };
                        return [4 /*yield*/, productRepository.update(product, data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productRepository, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        productRepository = typeorm_1.getRepository(Product_1.Product);
                        return [4 /*yield*/, productRepository.findOneOrFail(id)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, productRepository.delete(product)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    }
};
