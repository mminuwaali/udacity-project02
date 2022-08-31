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
const model_1 = __importDefault(require("../model"));
const email_validator_1 = require("email-validator");
const express_1 = require("express");
const auth_1 = require("../../../../config/auth");
const router = (0, express_1.Router)();
router
    // index router
    .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('auth');
}))
    // verify user credentials
    .get('/veryfy', auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ auth: true, message: 'Authenticated.' });
}))
    // get user by email params
    .get('/:email', auth_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!(0, email_validator_1.validate)(email))
        return res.status(400).send({ message: "the email is not valid" });
    const user = yield model_1.default.findByPk(email);
    if (user)
        return res.send({ user: user.short() });
    else
        return res.status(404).send({ message: 'user with this email is not found' });
}))
    // register a new user
    .post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    const plainPassword = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    // check if email and password are valid
    if (!email || !(0, email_validator_1.validate)(email))
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    if (!plainPassword)
        return res.status(400).send({ auth: false, message: 'Password is required' });
    const user = yield model_1.default.findByPk(email);
    if (user)
        return res.status(422).send({ auth: false, message: 'User already exist' });
    const password = yield (0, auth_1.generatePassword)(plainPassword);
    let savedUser;
    const newUser = yield model_1.default.create({ email, password });
    try {
        savedUser = yield newUser.save();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    ;
    const jwt = (0, auth_1.generateJWT)(savedUser);
    res.status(201).send({ token: jwt, user: savedUser.short() });
}))
    // login a user
    .post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !(0, email_validator_1.validate)(email))
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    if (!password)
        return res.status(400).send({ auth: false, message: 'Password is required' });
    const user = yield model_1.default.findByPk(email);
    if (!user)
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    const authValid = yield (0, auth_1.comparePaswords)(password, user.password);
    if (!authValid)
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    const jwt = (0, auth_1.generateJWT)(user);
    res.status(200).send({ auth: true, token: jwt, user: user.short() });
}));
exports.default = router;
//# sourceMappingURL=index.js.map