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
exports.Company = void 0;
var typeorm_1 = require("typeorm");
var Segment_1 = require("./Segment");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Company.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "logo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "trading_name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Company.prototype, "cnpj", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Company.prototype, "state_registration", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Company.prototype, "zip_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Company.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "street", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "complement", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "neighborhood", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "city", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "state", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Company.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "delivery", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "pickup_in_place", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Company.prototype, "company_indication", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Segment_1.Segment; }),
        typeorm_1.JoinColumn({ name: 'segment_id' }),
        __metadata("design:type", Segment_1.Segment)
    ], Company.prototype, "segment", void 0);
    Company = __decorate([
        typeorm_1.Entity('companies')
    ], Company);
    return Company;
}());
exports.Company = Company;
