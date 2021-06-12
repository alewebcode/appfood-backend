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
var Company_1 = require("../models/Company");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var companiesRepository, companies, _a, page, limit, offset, totalResults, filter, companies_1, result, companiesRepository_1, companies_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        companiesRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companiesRepository.find()];
                    case 1:
                        companies = _b.sent();
                        if (!request.query) return [3 /*break*/, 4];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, companiesRepository.count()
                            //console.log(totalResults)
                        ];
                    case 2:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, companiesRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
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
                        return [4 /*yield*/, companiesRepository_1.find()];
                    case 5:
                        companies_2 = _b.sent();
                        return [2 /*return*/, response.status(201).json(companies_2)];
                    case 6: return [2 /*return*/, response.status(201).json(companies)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, trading_name, cnpj, state_registration, zip_code, street, number, complement, neighborhood, city, state, phone, email, delivery, pickup_in_place, company_indication, segment, companyRepository, requestLogo, file, data, company;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, trading_name = _a.trading_name, cnpj = _a.cnpj, state_registration = _a.state_registration, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state, phone = _a.phone, email = _a.email, delivery = _a.delivery, pickup_in_place = _a.pickup_in_place, company_indication = _a.company_indication, segment = _a.segment;
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
                            city: city,
                            state: state,
                            phone: phone,
                            email: email,
                            delivery: delivery,
                            pickup_in_place: pickup_in_place,
                            company_indication: '',
                            segment: segment,
                            logo: file
                        };
                        company = companyRepository.create(data);
                        return [4 /*yield*/, companyRepository.save(company)];
                    case 1:
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
                        //console.log(company.logo)
                        company.logo = "http://192.168.0.103:3333/uploads/" + company.logo;
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
    }
};
