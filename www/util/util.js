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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFiles = exports.filteredImageURL = void 0;
const jimp_1 = require("jimp");
const fs_1 = require("fs");
const filteredImageURL = (inputURL) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const photo = yield (0, jimp_1.read)(inputURL);
            const outPath = `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`;
            photo
                .resize(256, 256)
                .quality(60)
                .grayscale()
                .write(__dirname + outPath, () => { res(__dirname + outPath); });
        }
        catch (error) {
            rej(error);
        }
    }));
});
exports.filteredImageURL = filteredImageURL;
const deleteLocalFiles = (files) => { for (let file of files)
    (0, fs_1.unlinkSync)(file); };
exports.deleteLocalFiles = deleteLocalFiles;
//# sourceMappingURL=util.js.map