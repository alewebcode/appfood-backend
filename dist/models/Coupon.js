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
exports.Coupon = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var Coupon = /** @class */ (function () {
    function Coupon() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Coupon.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupon.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupon.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupon.prototype, "expiration_date", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Coupon.prototype, "active", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupon.prototype, "coupon_code", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Product_1.Product; }),
        typeorm_1.JoinColumn({ name: 'product_id' }),
        __metadata("design:type", Product_1.Product)
    ], Coupon.prototype, "product", void 0);
    Coupon = __decorate([
        typeorm_1.Entity('coupons')
    ], Coupon);
    return Coupon;
}());
exports.Coupon = Coupon;
