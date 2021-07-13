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
exports.Salesman = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Salesman = /** @class */ (function () {
    function Salesman() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Salesman.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'date' }),
        __metadata("design:type", String)
    ], Salesman.prototype, "birthdate", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Salesman.prototype, "cpf", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Salesman.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Salesman.prototype, "zip_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "street", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Salesman.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "complement", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "neighborhood", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "city", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Salesman.prototype, "state", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.User; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Salesman.prototype, "user", void 0);
    Salesman = __decorate([
        typeorm_1.Entity('salesmans')
    ], Salesman);
    return Salesman;
}());
exports.Salesman = Salesman;
