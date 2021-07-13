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
var User_1 = require("../models/User");
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, _a, page, limit, offset, totalResults, filter, users, result, usersRepository_1, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        usersRepository = typeorm_1.getRepository(User_1.User);
                        if (!request.query) return [3 /*break*/, 3];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, usersRepository.count()
                            //console.log(totalResults)
                        ];
                    case 1:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, usersRepository.createQueryBuilder()
                                .innerJoinAndSelect("User.user_type", "id_user_type")
                                .where("LOWER(User.name) LIKE :name", { name: "%" + filter + "%" })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 2:
                        users = _b.sent();
                        result = {
                            totalResults: totalResults,
                            users: users
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 3:
                        usersRepository_1 = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, usersRepository_1.findOneOrFail({
                                relations: ['user_type']
                            })];
                    case 4:
                        users = _b.sent();
                        return [2 /*return*/, response.status(201).json(users)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, password_hash, userRepository, data, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
                    case 1:
                        password_hash = _b.sent();
                        userRepository = typeorm_1.getRepository(User_1.User);
                        data = {
                            name: name,
                            email: email,
                            password: password_hash,
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
};
