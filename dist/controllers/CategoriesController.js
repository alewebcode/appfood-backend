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
var Category_1 = require("../models/Category");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var categoriesRepository, _a, page, limit, offset, totalResults, filter, categories, result, categoriesRepository_1, categories;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        categoriesRepository = typeorm_1.getRepository(Category_1.Category);
                        if (!request.query) return [3 /*break*/, 3];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, categoriesRepository.count()];
                    case 1:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, categoriesRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 2:
                        categories = _b.sent();
                        result = {
                            totalResults: totalResults,
                            categories: categories
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 3:
                        categoriesRepository_1 = typeorm_1.getRepository(Category_1.Category);
                        return [4 /*yield*/, categoriesRepository_1.find()];
                    case 4:
                        categories = _b.sent();
                        return [2 /*return*/, response.status(201).json(categories)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, categoryRepository, data, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body.name;
                        categoryRepository = typeorm_1.getRepository(Category_1.Category);
                        data = { name: name };
                        category = categoryRepository.create(data);
                        return [4 /*yield*/, categoryRepository.save(category)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, categoryRepository, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        categoryRepository = typeorm_1.getRepository(Category_1.Category);
                        return [4 /*yield*/, categoryRepository.findOneOrFail(id)];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, response.json(category)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, categoryRepository, category, name, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        categoryRepository = typeorm_1.getRepository(Category_1.Category);
                        return [4 /*yield*/, categoryRepository.findOneOrFail(id)];
                    case 1:
                        category = _a.sent();
                        name = request.body.name;
                        data = { name: name };
                        return [4 /*yield*/, categoryRepository.update(category, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, categoryRepository, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        categoryRepository = typeorm_1.getRepository(Category_1.Category);
                        return [4 /*yield*/, categoryRepository.findOneOrFail(id)];
                    case 1:
                        category = _a.sent();
                        return [4 /*yield*/, categoryRepository.delete(category)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    }
};
