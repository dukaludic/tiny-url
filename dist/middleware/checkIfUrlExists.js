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
exports.checkIfUrlExists = void 0;
const urlModel_1 = __importDefault(require("../models/urlModel"));
const checkIfUrlExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { long_url: { $eq: req.body.long_url } };
    const url = yield urlModel_1.default.findOne(filter);
    console.log(url, "exists");
    if (url && url.counter !== undefined) {
        url.counter = url.counter + 1;
        url.save();
        res.send(url);
    }
    else {
        next();
    }
});
exports.checkIfUrlExists = checkIfUrlExists;
