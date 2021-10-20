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
exports.OrderItem = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var Order_1 = require("./Order");
var Coupon_1 = require("./Coupon");
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Product_1.Product; }),
        typeorm_1.JoinColumn({ name: 'product_id' }),
        __metadata("design:type", Product_1.Product)
    ], OrderItem.prototype, "product", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Order_1.Order; }),
        typeorm_1.JoinColumn({ name: 'order_id' }),
        __metadata("design:type", Order_1.Order)
    ], OrderItem.prototype, "order", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Coupon_1.Coupon; }),
        typeorm_1.JoinColumn({ name: 'coupon_id' }),
        __metadata("design:type", Coupon_1.Coupon)
    ], OrderItem.prototype, "coupon", void 0);
    OrderItem = __decorate([
        typeorm_1.Entity('orders_items')
    ], OrderItem);
    return OrderItem;
}());
exports.OrderItem = OrderItem;
