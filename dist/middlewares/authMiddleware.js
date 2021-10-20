"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).send();
    }
    var token = authorization.replace('Bearer', '').trim();
    try {
        var data = jsonwebtoken_1.default.verify(token, 'secret');
        var id = data.id, id_user_type = data.id_user_type;
        if (id_user_type == 3) {
            return res.status(401).send();
        }
        req.userId = id;
        return next();
    }
    catch (_a) {
        return res.status(401).send();
    }
}
exports.default = authMiddleware;
