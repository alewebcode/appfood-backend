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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../models/User");
var Mail_1 = __importDefault(require("../lib/Mail"));
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, referral_code, _a, page, limit, offset, filter, users, totalResults, result, usersRepository_1, users, totalResults, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        usersRepository = typeorm_1.getRepository(User_1.User);
                        referral_code = request.query.referral_code;
                        if (!request.query.filter) return [3 /*break*/, 2];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        filter = request.query.filter ? request.query.filter : '';
                        console.log(filter);
                        return [4 /*yield*/, usersRepository.createQueryBuilder()
                                .innerJoinAndSelect("User.user_type", "id_user_type")
                                .where("LOWER(User.name) LIKE :name", { name: "%" + filter + "%" })
                                .andWhere("referral_code = :referral_code OR user_referral = :referral_code", {
                                referral_code: referral_code,
                                user_referral: referral_code
                            })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 1:
                        users = _b.sent();
                        totalResults = users.length;
                        result = {
                            totalResults: totalResults,
                            users: users
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 2:
                        usersRepository_1 = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, usersRepository_1.find({
                                where: [
                                    { referral_code: referral_code },
                                    { user_referral: referral_code }
                                ],
                                relations: ['user_type']
                            })];
                    case 3:
                        users = _b.sent();
                        totalResults = users.length;
                        result = {
                            totalResults: totalResults,
                            users: users
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, userRepository, userExists, data, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: email })];
                    case 1:
                        userExists = _b.sent();
                        if (userExists) {
                            return [2 /*return*/, response.status(400).json({ error: 'User already exists' })];
                        }
                        data = {
                            name: name,
                            email: email,
                            password: password,
                            user_type: 1
                        };
                        user = userRepository.create(data);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response.json(user)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user, _a, name, email, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 1:
                        user = _b.sent();
                        _a = request.body, name = _a.name, email = _a.email;
                        data = { name: name, email: email };
                        return [4 /*yield*/, userRepository.update(user, data)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.delete(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    inactivate: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 1:
                        user = _a.sent();
                        data = { active: false };
                        return [4 /*yield*/, userRepository.update(user, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    activate: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepository, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 1:
                        user = _a.sent();
                        data = { active: true };
                        return [4 /*yield*/, userRepository.update(user, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    authenticate: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, userRepository, user, isValidPassword, token, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = request.body, email = _a.email, password = _a.password;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: email }, { relations: ['user_type'] })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(401).json({ error: "User not found" })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, response.status(401).json({ error: "Password is invalid" })];
                        }
                        token = jsonwebtoken_1.default.sign({ id: user.id, user_type: user.user_type }, 'secret', { expiresIn: '1d' });
                        // if(user.user_type.id == 2){
                        //     const salesmanRepository = getRepository(Salesman);
                        //     const salesman = await salesmanRepository.find({
                        //       where:{user:user.id}
                        //     })
                        //     user.referral_code = salesman[0].referral_code
                        // }else if(user.user_type.id == 3){
                        //   const customerRepository = getRepository(Customer);
                        //   const customer = await customerRepository.find({
                        //     where:{user:user.id}
                        //   })
                        //   user.referral_code = customer[0].referral_code
                        // }else{
                        //user.referral_code = user.user_referral
                        //}
                        delete user.password;
                        return [2 /*return*/, response.json({
                                user: user,
                                token: token
                            })];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, response.status(401).json({ error: "User authentication failed" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    sendMailIndication: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, referralLink, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, referralLink = _a.referralLink;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Mail_1.default.sendMail({
                                from: 'teste <teste@teste.com.br>',
                                to: "< " + email + " >",
                                subject: 'Indicação',
                                template: 'indication',
                                context: { referralLink: referralLink }
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json(true)];
                    case 3:
                        err_2 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
