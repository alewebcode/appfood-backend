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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var UserType_1 = require("./UserType");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Company_1 = require("./Company");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.hashPassword = function () {
        this.password = bcrypt_1.default.hashSync(this.password, 8);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], User.prototype, "active", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "referral_code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "user_referral", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return UserType_1.UserType; }),
        typeorm_1.JoinColumn({ name: 'id_user_type' }),
        __metadata("design:type", UserType_1.UserType)
    ], User.prototype, "user_type", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Company_1.Company; }),
        typeorm_1.JoinColumn({ name: 'company_id' }),
        __metadata("design:type", Company_1.Company)
    ], User.prototype, "company", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "hashPassword", null);
    User = __decorate([
        typeorm_1.Entity('users')
    ], User);
    return User;
}());
exports.User = User;
