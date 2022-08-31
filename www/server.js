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
require('dotenv').config();
const router_1 = __importDefault(require("./controllers/v0/router"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.port || 8080;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `http://localhost:${port}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express_1.default.json());
app.use('/api/v0', router_1.default);
const Server = () => __awaiter(void 0, void 0, void 0, function* () {
    // database connection
    // Sequelize.addModels(models);
    // await Sequelize.sync();
    // server endpoints
    app.get('/', (req, res, next) => {
        console.log(req.body);
        res.send('<h1>Welcome to my website.</h1> <span>try GET /filteredimage?image_url={{}}</span>');
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log('Press CTRL + C to cancel the server');
    });
});
Server();
//# sourceMappingURL=server.js.map