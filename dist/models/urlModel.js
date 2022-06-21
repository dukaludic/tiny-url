"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    long_url: { type: String, required: false },
    short_url: { type: String, required: false },
    counter: { type: Number, required: false, default: 0 },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
exports.default = mongoose_1.default.model("Url", urlSchema);
