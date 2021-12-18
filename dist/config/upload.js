"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uploadFolder = path_1.default.join(__dirname, '..', '..', 'uploads');
exports.default = {
    directory: uploadFolder,
    storage: multer_1.default.diskStorage({
        destination: uploadFolder,
        filename: function (request, file, cb) {
            var filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        }
    })
};
