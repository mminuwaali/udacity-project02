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
const util_1 = require("../../../../util/util");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('try GET /filteredimage?url={{}}');
}))
    .get('/filteredimage', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url)
        return res.status(404).send('The image url is not provided in the query');
    const file = yield (0, util_1.filteredImageURL)(url);
    if (file) {
        var others = (yield model_1.default.findAll()).map(({ caption }) => caption);
        const current = yield model_1.default.create({ url, caption: file });
        try {
            yield current.save();
            (0, util_1.deleteLocalFiles)(others);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        return res.sendFile(file);
    }
    else
        return res.status(400).send('There was an error getting file');
}));
exports.default = router;
//# sourceMappingURL=index.js.map