"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var crypto = __importStar(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Company_1 = require("../models/Company");
var Product_1 = require("../models/Product");
var City_1 = require("../models/City");
var Coupon_1 = require("../models/Coupon");
var User_1 = require("../models/User");
var Mail_1 = __importDefault(require("../lib/Mail"));
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var companiesRepository, companies, user_referral, _a, page, limit, offset, totalResults, filter, companies_1, result, companiesRepository_1, companies_2, totalResults, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        companiesRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companiesRepository.find()];
                    case 1:
                        companies = _b.sent();
                        user_referral = request.query.user_referral;
                        if (!request.query.filter) return [3 /*break*/, 4];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, companiesRepository.count()];
                    case 2:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, companiesRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
                                .andWhere("user_referral =:user_referral", { user_referral: user_referral })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 3:
                        companies_1 = _b.sent();
                        result = {
                            totalResults: totalResults,
                            companies: companies_1
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 4:
                        companiesRepository_1 = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companiesRepository_1.find({
                                where: { user_referral: user_referral }
                            })];
                    case 5:
                        companies_2 = _b.sent();
                        totalResults = companies_2.length;
                        result = {
                            totalResults: totalResults,
                            companies: companies_2
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usertoken, token, decoded, _a, name, trading_name, cnpj, state_registration, zip_code, street, number, complement, neighborhood, city, state, phone, email, delivery, pickup_in_place, company_indication, segment, userRepository, user_exists, password, password_hash, findUser, referral_code, userData, newUser, user, companyRepository, requestLogo, file, data, company, data_email;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        usertoken = request.header('Authorization');
                        token = usertoken.split(' ');
                        decoded = jsonwebtoken_1.default.verify(token[1], 'secret');
                        _a = request.body, name = _a.name, trading_name = _a.trading_name, cnpj = _a.cnpj, state_registration = _a.state_registration, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state, phone = _a.phone, email = _a.email, delivery = _a.delivery, pickup_in_place = _a.pickup_in_place, company_indication = _a.company_indication, segment = _a.segment;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: email })];
                    case 1:
                        user_exists = _b.sent();
                        if (user_exists) {
                            return [2 /*return*/, response.status(401).json({ error: "User already exists" })];
                        }
                        password = crypto.randomBytes(4).toString('hex');
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
                    case 2:
                        password_hash = _b.sent();
                        return [4 /*yield*/, userRepository.findOne(decoded.id)];
                    case 3:
                        findUser = _b.sent();
                        referral_code = crypto.randomBytes(3).toString('hex');
                        userData = {
                            name: name,
                            email: email,
                            password: password_hash,
                            user_type: 4,
                            referral_code: referral_code //findUser.referral_code,
                        };
                        newUser = userRepository.create(userData);
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 4:
                        user = _b.sent();
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        requestLogo = request.file;
                        file = requestLogo ? requestLogo.filename : '';
                        data = {
                            name: name,
                            trading_name: trading_name,
                            cnpj: cnpj,
                            state_registration: state_registration,
                            zip_code: zip_code,
                            street: street,
                            number: number,
                            complement: complement,
                            neighborhood: neighborhood,
                            city: 1,
                            state: state,
                            phone: phone,
                            email: email,
                            delivery: delivery,
                            pickup_in_place: pickup_in_place,
                            company_indication: '',
                            segment: segment,
                            logo: file,
                            referral_code: referral_code,
                            user_referral: findUser.referral_code
                        };
                        company = companyRepository.create(data);
                        return [4 /*yield*/, companyRepository.save(company)];
                    case 5:
                        _b.sent();
                        data_email = __assign(__assign({}, userData), { password: password });
                        return [4 /*yield*/, Mail_1.default.sendMail({
                                from: 'teste <teste@teste.com.br>',
                                to: "< " + userData.email + " >",
                                subject: 'Cadastro da sua empresa no Tem de tudo',
                                template: 'new_company',
                                context: { data_email: data_email }
                            })];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, companyRepository, company;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOneOrFail(id, {
                                relations: ['segment']
                            })];
                    case 1:
                        company = _a.sent();
                        //company.logo = `http://192.168.0.100:3333/uploads/${company.logo}`
                        company.logo = "https://appfood-backend.herokuapp.com/uploads/" + company.logo;
                        return [2 /*return*/, response.json(company)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, companyRepository, company, _a, name, trading_name, cnpj, state_registration, zip_code, street, number, complement, neighborhood, city, state, phone, email, delivery, pickup_in_place, company_indication, segment, requestLogo, file, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOneOrFail(id)];
                    case 1:
                        company = _b.sent();
                        _a = request.body, name = _a.name, trading_name = _a.trading_name, cnpj = _a.cnpj, state_registration = _a.state_registration, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state, phone = _a.phone, email = _a.email, delivery = _a.delivery, pickup_in_place = _a.pickup_in_place, company_indication = _a.company_indication, segment = _a.segment;
                        requestLogo = request.file;
                        file = requestLogo ? requestLogo.filename : '';
                        data = {
                            name: name,
                            trading_name: trading_name,
                            cnpj: cnpj,
                            state_registration: state_registration,
                            zip_code: zip_code,
                            street: street,
                            number: number,
                            complement: complement,
                            neighborhood: neighborhood,
                            city: city,
                            state: state,
                            phone: phone,
                            email: email,
                            delivery: delivery === 'true',
                            pickup_in_place: pickup_in_place,
                            company_indication: '',
                            segment: segment,
                            logo: file
                        };
                        return [4 /*yield*/, companyRepository.update(company, data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, companyRepository, company;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOneOrFail(id)];
                    case 1:
                        company = _a.sent();
                        return [4 /*yield*/, companyRepository.delete(company)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    filterCities: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var companiesRepository, cities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companiesRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companiesRepository.createQueryBuilder()
                                .select('DISTINCT ("city")')
                                .getRawMany()];
                    case 1:
                        cities = _a.sent();
                        return [2 /*return*/, response.json(cities)];
                }
            });
        });
    },
    searchCompanies: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var companiesRepository, filter, companies, slug, cityRepository, city, companies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companiesRepository = typeorm_1.getRepository(Company_1.Company);
                        if (!request.query.filterProductCompany) return [3 /*break*/, 2];
                        filter = request.query.filterProductCompany ? request.query.filterProductCompany : '';
                        return [4 /*yield*/, companiesRepository
                                .createQueryBuilder("companies")
                                .select(["product.id",
                                "product.name",
                                "product.image",
                                "product.description",
                                "product.price",
                                "companies.name",
                                "coupons.id as coupon_id",
                                "coupons.coupon_code as coupon_code",
                                "coupons.amount as coupon_amount"])
                                .innerJoin("companies.segment", "segment_id")
                                .innerJoin("companies.products", "product")
                                .innerJoin(Coupon_1.Coupon, "coupons", "Product.id = coupons.product_id")
                                .where("LOWER(product.name) || LOWER(companies.name) LIKE :name", { name: "%" + filter + "%" })
                                .andWhere('companies.id <> :id', { id: 1 })
                                //.andWhere("coupons.active = true")
                                .getRawMany()];
                    case 1:
                        companies = _a.sent();
                        return [2 /*return*/, response.json(companies)];
                    case 2:
                        slug = request.query.slug ? request.query.slug : '';
                        cityRepository = typeorm_1.getRepository(City_1.City);
                        return [4 /*yield*/, cityRepository.findOne({
                                where: { slug: slug }
                            })];
                    case 3:
                        city = _a.sent();
                        return [4 /*yield*/, companiesRepository
                                .createQueryBuilder("companies")
                                .select(["product.id",
                                "product.name",
                                "product.image",
                                "product.description",
                                "product.price",
                                "companies.name",
                                "coupons.id as coupon_id",
                                "coupons.coupon_code as coupon_code",
                                "coupons.amount as coupon_amount"])
                                .innerJoin("companies.segment", "segment_id")
                                .innerJoin("companies.products", "product")
                                .innerJoin(Coupon_1.Coupon, "coupons", "Product.id = coupons.product_id")
                                .where('companies.city = :city', { city: city.id })
                                .andWhere('companies.id <> :id', { id: 1 })
                                //.andWhere("coupons.active = true")
                                .getRawMany()];
                    case 4:
                        companies = _a.sent();
                        return [2 /*return*/, response.json(companies)];
                }
            });
        });
    },
    listProducts: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, productsRepository, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        productsRepository = typeorm_1.getRepository(Product_1.Product);
                        return [4 /*yield*/, productsRepository.find({
                                where: { company: id }
                            })];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, response.status(201).json(products)];
                }
            });
        });
    },
};
