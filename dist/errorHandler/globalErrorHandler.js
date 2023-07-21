"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    const statusCode = 500;
    const message = (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : 'Something went wrong';
    const errorMessages = (err === null || err === void 0 ? void 0 : err.message)
        ? [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ]
        : [];
    console.log('--------------error---------------', err);
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
