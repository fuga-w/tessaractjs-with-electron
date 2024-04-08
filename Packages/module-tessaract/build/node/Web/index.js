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
exports.recognize = void 0;
const index_1 = require("../index");
const base64StringToFile = (base64String) => {
    const byteString = atob(base64String);
    const arrayBuffer = Uint8Array.from(byteString, (c) => c.charCodeAt(0));
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    return blob;
};
function recognize(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const [_, imageBody] = image.split(",");
        const blob = base64StringToFile(imageBody);
        const result = yield (0, index_1.recognizeText)(blob);
        return result;
    });
}
exports.recognize = recognize;
