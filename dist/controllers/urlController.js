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
exports.getSingleUrl = exports.insertUrl = exports.getUrls = void 0;
const urlModel_1 = __importDefault(require("../models/urlModel"));
// mozda koristiti asyncHandler iz expressa
const getUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield urlModel_1.default.find();
        res.send(urls);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUrls = getUrls;
const insertUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.long_url) {
        res.status(400);
        throw new Error("Input is needed");
    }
    try {
        const url = yield urlModel_1.default.create({ long_url: req.body.long_url });
        // await Url.
        // const newUrl = new Url({
        //   url: req.body.url,
        // });
        res.send(url);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.insertUrl = insertUrl;
const getSingleUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const url = urlModel_1.default.findOne({ id: req.params.id });
    //   console.log
    res.send("getSingleUrl");
});
exports.getSingleUrl = getSingleUrl;
