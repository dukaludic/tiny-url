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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const urls_1 = __importDefault(require("./routes/urls"));
const error_1 = require("./middleware/error");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// Connect database
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect(`${process.env.MONGO_CONNECTION}`);
        // console.log(connection);
        console.log("Connected to database");
    }
    catch (error) {
        console.log(error);
    }
}))();
const app = (0, express_1.default)();
app.use(error_1.errorHandler);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.get("*", (req, res) => {
//   res.send("*");
// });
app.get("/home", error_1.errorHandler, (req, res) => {
    res.status(200).json({ message: "home" });
});
app.use("/urls", urls_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000");
});
