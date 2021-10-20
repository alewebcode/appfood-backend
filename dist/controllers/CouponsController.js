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
var date_fns_1 = require("date-fns");
var Coupon_1 = require("../models/Coupon");
var Company_1 = require("../models/Company");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var couponRepository, coupons, referral_code, _a, page, limit, offset, totalResults, filter, coupons_1, result, couponRepository_1, coupon, companyRepository, company, company_id, coupons_2, totalResults, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository.find()];
                    case 1:
                        coupons = _b.sent();
                        referral_code = request.query.referral_code;
                        if (!request.query.filter) return [3 /*break*/, 4];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, couponRepository.count()];
                    case 2:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, couponRepository.createQueryBuilder()
                                .where("LOWER(description) LIKE :description", { description: "%" + filter + "%" })
                                .where("LOWER(coupon_code) LIKE :coupon_code", { coupon_code: "%" + filter + "%" })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 3:
                        coupons_1 = _b.sent();
                        result = {
                            totalResults: totalResults,
                            coupons: coupons_1
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 4:
                        couponRepository_1 = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository_1.find()];
                    case 5:
                        coupon = _b.sent();
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOne({
                                where: { referral_code: referral_code }
                            })];
                    case 6:
                        company = _b.sent();
                        company_id = company.id;
                        return [4 /*yield*/, couponRepository_1.createQueryBuilder()
                                .innerJoinAndSelect("Coupon.product", "product_id")
                                .where("company_id = " + company_id)
                                .getMany()];
                    case 7:
                        coupons_2 = _b.sent();
                        totalResults = coupons_2.length;
                        result = {
                            totalResults: totalResults,
                            coupons: coupons_2
                        };
                        //console.log(coupons)
                        return [2 /*return*/, response.status(201).json(result)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var dateNow, addedDate, expirate_date, _a, description, amount, coupon_code, product, format_amount, data, couponRepository, coupon;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dateNow = new Date();
                        addedDate = date_fns_1.addHours(dateNow, 72);
                        expirate_date = date_fns_1.format(addedDate, 'Y-MM-dd HH:mm');
                        _a = request.body, description = _a.description, amount = _a.amount, coupon_code = _a.coupon_code, product = _a.product;
                        format_amount = amount
                            .replace(',', '.')
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        data = {
                            description: description,
                            amount: format_amount,
                            expiration_date: expirate_date,
                            coupon_code: coupon_code,
                            product: product
                        };
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        coupon = couponRepository.create(data);
                        return [4 /*yield*/, couponRepository.save(coupon)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, couponRepository, coupon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository.findOneOrFail(id, {
                                relations: ['product']
                            })];
                    case 1:
                        coupon = _a.sent();
                        return [2 /*return*/, response.json(coupon)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, couponRepository, coupon, _a, description, amount, coupon_code, product, format_amount, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository.findOneOrFail(id)];
                    case 1:
                        coupon = _b.sent();
                        _a = request.body, description = _a.description, amount = _a.amount, coupon_code = _a.coupon_code, product = _a.product;
                        format_amount = amount
                            .replace(',', '.')
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                        data = {
                            description: description,
                            amount: format_amount,
                            expiration_date: coupon.expiration_date,
                            coupon_code: coupon_code,
                            product: product
                        };
                        return [4 /*yield*/, couponRepository.update(coupon, data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, couponRepository, coupon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository.findOneOrFail(id)];
                    case 1:
                        coupon = _a.sent();
                        return [4 /*yield*/, couponRepository.delete(coupon)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    listCoupons: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, couponRepository, coupons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        return [4 /*yield*/, couponRepository.createQueryBuilder()
                                .innerJoinAndSelect("Coupon.product", "product_id")
                                .where("company_id = " + id)
                                .andWhere("Coupon.active = true")
                                .getMany()];
                    case 1:
                        coupons = _a.sent();
                        return [2 /*return*/, response.json(coupons)];
                }
            });
        });
    },
};
