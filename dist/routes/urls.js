"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const urlController_1 = require("../controllers/urlController");
const checkIfUrlExists_1 = require("../middleware/checkIfUrlExists");
const logger = (req, res, next) => {
    console.log("LOG");
    next();
};
router.get("/", urlController_1.getUrls);
// router.use(errorHandler);
router.post("/", logger, checkIfUrlExists_1.checkIfUrlExists, urlController_1.insertUrl);
router.get("/:id", urlController_1.getSingleUrl);
exports.default = router;
