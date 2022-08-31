"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config_1 = __importDefault(require("./config/config"));
const sequelize_typescript_1 = require("sequelize-typescript");
const { dev: { username, password, database, host } } = config_1.default;
exports.default = new sequelize_typescript_1.Sequelize({ username, password, database, host, dialect: 'postgres', storage: ':memory:' });
//# sourceMappingURL=sequelize.js.map