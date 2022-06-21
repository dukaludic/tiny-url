"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(err, "ERROR");
    res.status(statusCode);
    res.json({
        message: err.message,
    });
    next();
};
exports.errorHandler = errorHandler;
