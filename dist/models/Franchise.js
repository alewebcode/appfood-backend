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
exports.Franchise = void 0;
var typeorm_1 = require("typeorm");
var Franchise = /** @class */ (function () {
    function Franchise() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Franchise.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Franchise.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Franchise.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Franchise.prototype, "referral_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Franchise.prototype, "commission", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Franchise.prototype, "total_cashback", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Franchise.prototype, "total_amount", void 0);
    Franchise = __decorate([
        typeorm_1.Entity('franchises')
    ], Franchise);
    return Franchise;
}());
exports.Franchise = Franchise;
