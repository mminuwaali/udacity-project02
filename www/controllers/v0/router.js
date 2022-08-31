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
const routes_1 = __importDefault(require("./user/routes"));
const routes_2 = __importDefault(require("./feed/routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/user', routes_1.default);
router.use('/feed', routes_2.default);
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { res.send('v0'); }));
exports.default = router;
//# sourceMappingURL=router.js.map