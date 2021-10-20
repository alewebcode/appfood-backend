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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var mail_1 = __importDefault(require("../config/mail"));
var path_1 = require("path");
var Mail = /** @class */ (function () {
    function Mail() {
        this.transporter = nodemailer_1.default.createTransport(mail_1.default);
        this.configureTemplates();
    }
    Mail.prototype.configureTemplates = function () {
        var hbs = require('nodemailer-express-handlebars');
        var viewPath = path_1.resolve(__dirname, '..', 'views', 'emails');
        var hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                layoutsDir: path_1.resolve(viewPath, 'layouts'),
                partialsDir: path_1.resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs',
            },
            viewPath: viewPath,
            extName: '.hbs'
        };
        this.transporter.use('compile', hbs(hbsConfig));
        //this.transporter.use('compile', hbs(hbsConfig));
    };
    Mail.prototype.sendMail = function (message) {
        return this.transporter.sendMail(__assign(__assign({}, mail_1.default.default), message));
    };
    return Mail;
}());
exports.default = new Mail();
