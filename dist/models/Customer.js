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
exports.Customer = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Customer.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "cpf", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "zip_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "street", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "complement", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "neighborhood", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "city", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "state", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "referral_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "user_referral", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "commission", void 0);
    __decorate([
        typeorm_1.Column({ type: 'date' }),
        __metadata("design:type", String)
    ], Customer.prototype, "birthdate", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Customer.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customer.prototype, "total_cashback", void 0);
    Customer = __decorate([
        typeorm_1.Entity('customers')
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
