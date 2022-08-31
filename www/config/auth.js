"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.generateJWT = exports.comparePaswords = exports.generatePassword = void 0;
require('dotenv').config();
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const rounds = 10;
const generatePassword = (plainTextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(rounds);
    const hashed = yield (0, bcrypt_1.hash)(plainTextPassword, salt);
    return hashed;
});
exports.generatePassword = generatePassword;
const comparePaswords = (plainTextPassword, hash) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcrypt_1.compare)(plainTextPassword, hash); });
exports.comparePaswords = comparePaswords;
const generateJWT = (user) => (0, jsonwebtoken_1.sign)(user.toJSON(), config_1.default.jwt.secret);
exports.generateJWT = generateJWT;
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers || !req.headers.authorization)
        return res.status(401).send({ message: 'No authorization headers provided' });
    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length !== 2)
        return res.status(401).send({ message: 'Malformed token!' });
    const token = token_bearer[1];
    return (0, jsonwebtoken_1.verify)(token, config_1.default.jwt.secret, (err, decodeURI) => {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate' });
        return next();
    });
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map