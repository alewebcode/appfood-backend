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
var Coupon_1 = require("../models/Coupon");
var Order_1 = require("../models/Order");
var OrderItem_1 = require("../models/OrderItem");
var Customer_1 = require("../models/Customer");
var User_1 = require("../models/User");
var Company_1 = require("../models/Company");
var Franchisor_1 = require("../models/Franchisor");
var Franchise_1 = require("../models/Franchise");
var Mail_1 = __importDefault(require("../lib/Mail"));
exports.default = {
    index: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var referral_code, companyRepository, company, orderRepository, orders, company_id, _a, page, limit, offset, totalResults, filter, orders_1, result, orderRepository_1, orders_2, totalResults, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        referral_code = request.query.referral_code;
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOne({
                                where: { referral_code: referral_code }
                            })];
                    case 1:
                        company = _b.sent();
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.find()];
                    case 2:
                        orders = _b.sent();
                        if (!request.query.filter) return [3 /*break*/, 5];
                        company_id = company.id;
                        _a = request.query, page = _a.page, limit = _a.limit;
                        offset = (page - 1) * limit;
                        return [4 /*yield*/, orderRepository.count()];
                    case 3:
                        totalResults = _b.sent();
                        filter = request.query.filter ? request.query.filter : '';
                        return [4 /*yield*/, orderRepository.createQueryBuilder()
                                .where("company_id =:company_id", { company_id: company_id })
                                .offset(offset)
                                .limit(limit)
                                .getMany()];
                    case 4:
                        orders_1 = _b.sent();
                        result = {
                            totalResults: totalResults,
                            orders: orders_1
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                    case 5:
                        orderRepository_1 = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository_1.find({
                                where: {
                                    company: company.id
                                },
                                relations: ['user']
                            })];
                    case 6:
                        orders_2 = _b.sent();
                        totalResults = orders_2.length;
                        result = {
                            totalResults: totalResults,
                            orders: orders_2
                        };
                        return [2 /*return*/, response.status(201).json(result)];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var date, _a, amount, delivery, status, customer, company, items, userRepository, userCustomer, data, orderRepository, order, newOrder, orderItemRepository, couponRepository;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        date = new Date();
                        _a = request.body, amount = _a.amount, delivery = _a.delivery, status = _a.status, customer = _a.customer, company = _a.company, items = _a.items;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(customer)];
                    case 1:
                        userCustomer = _b.sent();
                        data = {
                            date: date,
                            amount: amount,
                            delivery: delivery,
                            status: status,
                            company: company,
                            customer: 78,
                            user: userCustomer.id
                        };
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        order = orderRepository.create(data);
                        return [4 /*yield*/, orderRepository.save(order)];
                    case 2:
                        newOrder = _b.sent();
                        orderItemRepository = typeorm_1.getRepository(OrderItem_1.OrderItem);
                        couponRepository = typeorm_1.getRepository(Coupon_1.Coupon);
                        items.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var orderItem, coupon, order;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        orderItem = { product: item.product_id, order: newOrder, coupon: item.coupon_id };
                                        return [4 /*yield*/, couponRepository.findOneOrFail(item.coupon_id)];
                                    case 1:
                                        coupon = _a.sent();
                                        couponRepository.update(coupon, { active: false });
                                        order = orderItemRepository.create(orderItem);
                                        orderItemRepository.save(order);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    show: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOneOrFail(id)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, response.json(order)];
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
    detail: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderItemRepository, ordersItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        orderItemRepository = typeorm_1.getRepository(OrderItem_1.OrderItem);
                        return [4 /*yield*/, orderItemRepository.createQueryBuilder('orderItem')
                                .innerJoinAndSelect("orderItem.product", "product_id")
                                .innerJoinAndSelect("orderItem.coupon", "coupon_id")
                                .where("order_id = " + id)
                                .getMany()];
                    case 1:
                        ordersItems = _a.sent();
                        return [2 /*return*/, response.json(ordersItems)];
                }
            });
        });
    },
    cancel: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, order, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOneOrFail(id)];
                    case 1:
                        order = _a.sent();
                        data = {
                            status: 'Cancelado'
                        };
                        return [4 /*yield*/, orderRepository.update(order, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    approve: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderRepository, order, data, userRepository, user, userRef, total_cashback, data_1, companyRepository, company, companyRepository, company, commission, data_2, franchisorRepository, franchisor, dataFinance, franchiseRepository, franchise, total_cashback, data_3, commission, data_4, franchisorRepository, franchisor, commission_franchisor, data_franchisor, franchisorRepository, franchisor, commission, total_amount, dataFinance, franchisorRepository, franchisor, total_cashback, data_5, customerRepository, customer, customerRepository, customer, commission, data_6, dataFinance, commission, total_amount, data_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOne({
                                relations: ['user', 'company'],
                                where: {
                                    'id': id
                                }
                            })];
                    case 1:
                        order = _a.sent();
                        data = {
                            status: 'Concluído'
                        };
                        return [4 /*yield*/, orderRepository.update(order, data)];
                    case 2:
                        _a.sent();
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(order.user)];
                    case 3:
                        user = _a.sent();
                        if (order.company.id == 1) {
                            order.user.user_referral = null;
                        }
                        return [4 /*yield*/, userRepository.findOne({
                                where: [
                                    { referral_code: order.user.user_referral },
                                    { referral_code: user.referral_code }
                                ],
                                relations: ['user_type']
                            })];
                    case 4:
                        userRef = _a.sent();
                        if (!(userRef.user_type.id == 4)) return [3 /*break*/, 12];
                        if (!(order.company.id == 1)) return [3 /*break*/, 7];
                        total_cashback = (10 / 100 * order.amount);
                        data_1 = {
                            total_cashback: total_cashback
                        };
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOne({
                                where: { referral_code: user.referral_code },
                            })];
                    case 5:
                        company = _a.sent();
                        return [4 /*yield*/, companyRepository.update(company, data_1)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 7:
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOne({
                                where: { referral_code: order.user.user_referral },
                            })];
                    case 8:
                        company = _a.sent();
                        commission = Number(company.commission) + Number((4 / 100 * order.amount));
                        data_2 = {
                            commission: commission
                        };
                        return [4 /*yield*/, companyRepository.update(company, data_2)];
                    case 9:
                        _a.sent();
                        franchisorRepository = typeorm_1.getRepository(Franchisor_1.Franchisor);
                        return [4 /*yield*/, franchisorRepository.findOne(1)];
                    case 10:
                        franchisor = _a.sent();
                        dataFinance = {
                            total_amount: commission
                        };
                        return [4 /*yield*/, franchisorRepository.update(franchisor, dataFinance)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(userRef.user_type.id == 5)) return [3 /*break*/, 19];
                        franchiseRepository = typeorm_1.getRepository(Franchise_1.Franchise);
                        return [4 /*yield*/, franchiseRepository.findOne({
                                where: { referral_code: order.user.user_referral },
                            })];
                    case 13:
                        franchise = _a.sent();
                        if (!(order.company.id == 1)) return [3 /*break*/, 15];
                        total_cashback = Number(franchise.total_cashback) + Number((10 / 100 * order.amount));
                        data_3 = {
                            total_cashback: total_cashback
                        };
                        return [4 /*yield*/, franchiseRepository.update(franchise, data_3)];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 19];
                    case 15:
                        commission = Number(franchise.commission) + Number((4 / 100 * order.amount));
                        data_4 = {
                            commission: commission,
                            total_amount: commission
                        };
                        return [4 /*yield*/, franchiseRepository.update(franchise, data_4)]; //atualiza comissão franquia
                    case 16:
                        _a.sent(); //atualiza comissão franquia
                        franchisorRepository = typeorm_1.getRepository(Franchisor_1.Franchisor);
                        return [4 /*yield*/, franchisorRepository.findOne(1)];
                    case 17:
                        franchisor = _a.sent();
                        commission_franchisor = Number(franchisor.commission) + Number((4 / 100 * order.amount));
                        data_franchisor = {
                            commission: commission_franchisor,
                            total_amount: commission
                        };
                        return [4 /*yield*/, franchisorRepository.update(franchisor, data_franchisor)]; //atualiza comissão em dinheiro para franqueadora
                    case 18:
                        _a.sent(); //atualiza comissão em dinheiro para franqueadora
                        _a.label = 19;
                    case 19:
                        if (!(userRef.user_type.id == 1)) return [3 /*break*/, 22];
                        franchisorRepository = typeorm_1.getRepository(Franchisor_1.Franchisor);
                        return [4 /*yield*/, franchisorRepository.findOne(1)];
                    case 20:
                        franchisor = _a.sent();
                        commission = Number(franchisor.commission) + Number((4 / 100 * order.amount));
                        total_amount = Number(franchisor.total_amount) + Number((4 / 100 * order.amount));
                        dataFinance = {
                            commission: commission,
                            total_amount: total_amount
                        };
                        return [4 /*yield*/, franchisorRepository.update(franchisor, dataFinance)];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22:
                        if (!(userRef.user_type.id == 3)) return [3 /*break*/, 32];
                        franchisorRepository = typeorm_1.getRepository(Franchisor_1.Franchisor);
                        return [4 /*yield*/, franchisorRepository.findOne(1)];
                    case 23:
                        franchisor = _a.sent();
                        if (!(order.company.id == 1)) return [3 /*break*/, 26];
                        total_cashback = (10 / 100 * order.amount);
                        data_5 = {
                            total_cashback: total_cashback
                        };
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOne({
                                where: { user: order.user },
                            })];
                    case 24:
                        customer = _a.sent();
                        return [4 /*yield*/, customerRepository.update(customer, data_5)];
                    case 25:
                        _a.sent();
                        return [3 /*break*/, 32];
                    case 26:
                        if (!order.user.user_referral) return [3 /*break*/, 30];
                        customerRepository = typeorm_1.getRepository(Customer_1.Customer);
                        return [4 /*yield*/, customerRepository.findOne({
                                where: { referral_code: order.user.user_referral },
                            })];
                    case 27:
                        customer = _a.sent();
                        commission = (4 / 100 * order.amount);
                        data_6 = {
                            commission: commission
                        };
                        return [4 /*yield*/, customerRepository.update(customer, data_6)]; //atualiza comissão cliente
                    case 28:
                        _a.sent(); //atualiza comissão cliente
                        dataFinance = {
                            total_amount: commission
                        };
                        return [4 /*yield*/, franchisorRepository.update(franchisor, dataFinance)]; //atualiza comissão em dinheiro franqueadora
                    case 29:
                        _a.sent(); //atualiza comissão em dinheiro franqueadora
                        return [3 /*break*/, 32];
                    case 30:
                        commission = (8 / 100 * order.amount);
                        total_amount = (4 / 100 * order.amount);
                        data_7 = {
                            commission: commission,
                            total_amount: total_amount
                        };
                        return [4 /*yield*/, franchisorRepository.update(franchisor, data_7)];
                    case 31:
                        _a.sent();
                        _a.label = 32;
                    case 32: return [2 /*return*/, response.status(201).send()];
                }
            });
        });
    },
    sendMailNewOrder: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, delivery, status, customer, company, items, userRepository, userCustomer, companyRepository, data_company, data, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, amount = _a.amount, delivery = _a.delivery, status = _a.status, customer = _a.customer, company = _a.company, items = _a.items;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(customer)];
                    case 1:
                        userCustomer = _b.sent();
                        companyRepository = typeorm_1.getRepository(Company_1.Company);
                        return [4 /*yield*/, companyRepository.findOne(company)];
                    case 2:
                        data_company = _b.sent();
                        data = {
                            amount: amount,
                            delivery: delivery,
                            status: status,
                            customer: userCustomer,
                            company: company,
                            items: items
                        };
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, Mail_1.default.sendMail({
                                from: 'teste <teste@teste.com.br>',
                                to: "< " + data_company.email + " >",
                                subject: 'Novo Pedido',
                                template: 'new_order',
                                context: { data: data }
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json(true)];
                    case 5:
                        err_1 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
