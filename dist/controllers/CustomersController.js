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
var bcrypt_1 = __importDefault(require("bcrypt"));
var typeorm_1 = require("typeorm");
var crypto = __importStar(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Salesman_1 = require("../models/Salesman");
var User_1 = require("../models/User");
var Customer_1 = require("../models/Customer");
var Order_1 = require("../models/Order");
var Mail_1 = __importDefault(require("../lib/Mail"));
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var customersRepository, customers, user_referral, _a, page, limit, offset, totalResults, filter, customers_1, result, customersRepository_1, customers_2, totalResults, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        customersRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customersRepository.find()];
                    case 1:
                        customers = _b.sent();
                        user_referral = request.query.user_referral;
                        if (!request.query.filter) return [3 /*break*/, 4];
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, customersRepository.count()];
                    case 2:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, customersRepository.createQueryBuilder()
                                .where("LOWER(name) LIKE :name", { name: "%" + filter + "%" })
                                .andWhere("user_referral =:user_referral", { user_referral: user_referral })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 3:
                        customers_1 = _b.sent();
                        result = {
                            totalResults: totalResults,
                            customers: customers_1
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 4:
                        customersRepository_1 = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customersRepository_1.find({
                                where: { user_referral: user_referral }
                            })];
                    case 5:
                        customers_2 = _b.sent();
                        totalResults = customers_2.length;
                        result = {
                            totalResults: totalResults,
                            customers: customers_2
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usertoken, token, decoded, userRepository, _a, name, birthdate, cpf, phone, email, zip_code, street, number, complement, neighborhood, city, state, password, password_hash, findUser, referral_code, userData, newUser, user, customerRepository, format_birthdate, data, customer, data_email;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        usertoken = request.header('Authorization');
                        token = usertoken.split(' ');
                        decoded = jsonwebtoken_1.default.verify(token[1], 'secret');
                        userRepository = typeorm_1.getRepository(User_1.User);
                        _a = request.body, name = _a.name, birthdate = _a.birthdate, cpf = _a.cpf, phone = _a.phone, email = _a.email, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state;
                        password = crypto.randomBytes(4).toString('hex');
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
                    case 1:
                        password_hash = _b.sent();
                        return [4 /*yield*/, userRepository.findOne(decoded.id)];
                    case 2:
                        findUser = _b.sent();
                        referral_code = crypto.randomBytes(3).toString('hex');
                        userData = {
                            name: name,
                            email: email,
                            password: password_hash,
                            user_type: 3,
                            referral_code: referral_code //findUser.referral_code
                        };
                        newUser = userRepository.create(userData);
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 3:
                        user = _b.sent();
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
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
                            user: user,
                            referral_code: referral_code,
                            user_referral: findUser.referral_code
                        };
                        customer = customerRepository.create(data);
                        return [4 /*yield*/, customerRepository.save(customer)];
                    case 4:
                        _b.sent();
                        data_email = __assign(__assign({}, userData), { password: password });
                        return [4 /*yield*/, Mail_1.default.sendMail({
                                from: 'teste <teste@teste.com.br>',
                                to: "< " + userData.email + " >",
                                subject: 'Seu cadastro no Tem de tudo',
                                template: 'new_customer',
                                context: { data_email: data_email }
                            })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    signUp: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user_referral, _a, name, phone, email, password, userRepository, password_hash, userData, newUser, user, customerRepository, referral_code, data, customer, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_referral = request.query.refferer ? request.query.refferer : '';
                        _a = request.body, name = _a.name, phone = _a.phone, email = _a.email, password = _a.password;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
                    case 1:
                        password_hash = _b.sent();
                        userData = {
                            name: name,
                            email: email,
                            password: password_hash,
                            user_type: 3
                        };
                        newUser = userRepository.create(userData);
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 2:
                        user = _b.sent();
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        referral_code = crypto.randomBytes(3).toString('hex');
                        data = {
                            name: name,
                            phone: phone,
                            email: email,
                            password: password,
                            user: user,
                            referral_code: referral_code,
                            user_referral: user_referral
                        };
                        customer = customerRepository.create(data);
                        return [4 /*yield*/, customerRepository.save(customer)];
                    case 3:
                        _b.sent();
                        token = jsonwebtoken_1.default.sign({ id: data.user.id, id_user_type: data.user.user_type }, 'secret', { expiresIn: '1d' });
                        //return response.status(201).json(customer);
                        return [2 /*return*/, response.json({
                                user: customer,
                                token: token
                            })];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customerRepository, customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOneOrFail(id)];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, response.json(customer)];
                }
            });
        });
    },
    update: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customerRepository, customer, _a, name, birthdate, cpf, phone, email, zip_code, street, number, complement, neighborhood, city, state, format_birthdate, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOneOrFail(id)];
                    case 1:
                        customer = _b.sent();
                        _a = request.body, name = _a.name, birthdate = _a.birthdate, cpf = _a.cpf, phone = _a.phone, email = _a.email, zip_code = _a.zip_code, street = _a.street, number = _a.number, complement = _a.complement, neighborhood = _a.neighborhood, city = _a.city, state = _a.state;
                        format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        data = {
                            name: name,
                            birthdate: format_birthdate,
                            cpf: cpf,
                            phone: phone,
                            email: email,
                            zip_code: zip_code ? zip_code : null,
                            street: street,
                            number: number ? number : null,
                            complement: complement,
                            neighborhood: neighborhood,
                            city: city,
                            state: state,
                            //user:28
                        };
                        return [4 /*yield*/, customerRepository.update(customer, data)];
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
    },
    orders: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customerRepository, customer, orderRepository, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOne({ where: { user: id } })];
                    case 1:
                        customer = _a.sent();
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.find({ where: { customer: customer } })];
                    case 2:
                        orders = _a.sent();
                        // const orderRepository = getRepository(Order);
                        // const orders = await orderRepository.find({ 
                        //   //relations:["orderItems"],
                        //   where:{
                        //     customer:customer
                        //   } 
                        // });
                        // const orderItemRepository = getRepository(OrderItem);
                        // const ordersItems = await orderRepository.createQueryBuilder('order')
                        // .innerJoinAndSelect("order.orderItems","orderItem") 
                        // //.innerJoinAndSelect("order.products","product")
                        // // .innerJoinAndSelect("OrderItem.coupon","coupon_id")
                        // .where('order.customer = customer')
                        // .getMany();
                        //console.log(ordersItems)
                        return [2 /*return*/, response.status(201).json(orders)];
                }
            });
        });
    },
    account: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customerRepository, customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOne({ where: { user: id } })];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, response.json(customer)];
                }
            });
        });
    },
};
