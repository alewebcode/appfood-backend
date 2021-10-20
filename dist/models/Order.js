"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var Company_1 = require("./Company");
var Customer_1 = require("./Customer");
var OrderItem_1 = require("./OrderItem");
var User_1 = require("./User");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Order.prototype, "delivery", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Company_1.Company; }),
        typeorm_1.JoinColumn({ name: 'company_id' }),
        __metadata("design:type", Company_1.Company)
    ], Order.prototype, "company", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Customer_1.Customer; }),
        typeorm_1.JoinColumn({ name: 'customer_id' }),
        __metadata("design:type", Customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Order.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return OrderItem_1.OrderItem; }, function (orderItem) { return orderItem.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "orderItems", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return OrderItem_1.OrderItem; }, function (product) { return product.product; }),
        __metadata("design:type", Array)
    ], Order.prototype, "products", void 0);
    Order = __decorate([
        typeorm_1.Entity('orders')
    ], Order);
    return Order;
}());
exports.Order = Order;
