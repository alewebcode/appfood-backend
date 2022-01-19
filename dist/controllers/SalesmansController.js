"use strict";
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
var bcrypt_1 = __importDefault(require("bcrypt"));
var typeorm_1 = require("typeorm");
var crypto = __importStar(require("crypto"));
var Salesman_1 = require("../models/Salesman");
var User_1 = require("../models/User");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var salesmansRepository, salesmans, _a, page, limit, offset, totalResults, filter, salesmans_1, result, salesmansRepository_1, salesmans_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        salesmansRepository = typeorm_1.getRepository(Salesman_1.Salesman);
                        return [4 /*yield*/, salesmansRepository.find()];
                    case 1:
                        salesmans = _b.sent();
                        if (!request.query) return [3 /*break*/, 4];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, salesmansRepository.count()
                            //console.log(totalResults)
                        ];
                    case 2:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, salesmansRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 3:
                        salesmans_1 = _b.sent();
                        result = {
                            totalResults: totalResults,
                            salesmans: salesmans_1
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 4:
                        salesmansRepository_1 = typeorm_1.getRepository(Salesman_1.Salesman);
                        return [4 /*yield*/, salesmansRepository_1.find()];
                    case 5:
                        salesmans_2 = _b.sent();
                        return [2 /*return*/, response.status(201).json(salesmans_2)];
                    case 6: return [2 /*return*/, response.status(201).json(salesmans)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, birthdate, cpf, phone, email, zip_code, street, number, complement, neighborhood, city, state, userRepository, password_hash, userData, newUser, user, salesmanRepository, format_birthdate, referral_code, data, salesman;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, birthdate = _a.birthdate, cpf = _a.cpf, phone = _a.phone, email = _a.email, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, bcrypt_1.default.hash('123456', 8)];
                    case 1:
                        password_hash = _b.sent();
                        userData = {
                            name: name,
                            email: email,
                            password: password_hash,
                            user_type: 2
                        };
                        newUser = userRepository.create(userData);
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 2:
                        user = _b.sent();
                        salesmanRepository = typeorm_1.getRepository(Salesman_1.Salesman);
                        format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        referral_code = crypto.randomBytes(6).toString('hex');
                        data = {
                            name: name,
                            birthdate: format_birthdate,
                            cpf: cpf,
                            phone: phone,
                            email: email,
                            zip_code: zip_code,
                            street: street,
                            number: number,
                            complement: complement,
                            neighborhood: neighborhood,
                            city: city,
                            state: state,
                            user: user,
                            referral_code: referral_code
                        };
                        salesman = salesmanRepository.create(data);
                        return [4 /*yield*/, salesmanRepository.save(salesman)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, salesmanRepository, salesman;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        salesmanRepository = typeorm_1.getRepository(Salesman_1.Salesman);
                        return [4 /*yield*/, salesmanRepository.findOneOrFail(id, {
                                relations: ['user']
                            })];
                    case 1:
                        salesman = _a.sent();
                        return [2 /*return*/, response.json(salesman)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, salesmanRepository, salesman, _a, name, birthdate, cpf, phone, email, zip_code, street, number, complement, neighborhood, city, state, format_birthdate, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        salesmanRepository = typeorm_1.getRepository(Salesman_1.Salesman);
                        return [4 /*yield*/, salesmanRepository.findOneOrFail(id)];
                    case 1:
                        salesman = _b.sent();
                        _a = request.body, name = _a.name, birthdate = _a.birthdate, cpf = _a.cpf, phone = _a.phone, email = _a.email, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state;
                        format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        data = {
                            name: name,
                            birthdate: format_birthdate,
                            cpf: cpf,
                            phone: phone,
                            email: email,
                            zip_code: zip_code,
                            street: street,
                            number: number,
                            complement: complement,
                            neighborhood: neighborhood,
                            city: city,
                            state: state,
                            user: 1
                        };
                        return [4 /*yield*/, salesmanRepository.update(salesman, data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, salesmanRepository, salesman;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        salesmanRepository = typeorm_1.getRepository(Salesman_1.Salesman);
                        return [4 /*yield*/, salesmanRepository.findOneOrFail(id)];
                    case 1:
                        salesman = _a.sent();
                        return [4 /*yield*/, salesmanRepository.delete(salesman)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    }
};
