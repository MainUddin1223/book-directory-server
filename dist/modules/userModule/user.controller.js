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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = yield user_service_1.userService.getWishList(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const getsavedList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const result = yield user_service_1.userService.getSavedList(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const addToSavedList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const bookId = req.params.id;
        const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const result = yield user_service_1.userService.addToSavedList(id, bookId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const addToWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const bookId = req.params.id;
        const id = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        const result = yield user_service_1.userService.addToWishList(id, bookId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    getWishList,
    getsavedList,
    addToSavedList,
    addToWishList,
};
