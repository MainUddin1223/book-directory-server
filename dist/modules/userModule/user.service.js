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
exports.userService = void 0;
const auth_model_1 = require("../authModule/auth.model");
const getWishList = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById({ _id }).select('wishList');
    return result === null || result === void 0 ? void 0 : result.wishList;
});
const getSavedList = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById({ _id }).select('saved');
    return result === null || result === void 0 ? void 0 : result.saved;
});
const addToWishList = (_id, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id }, { $addToSet: { saved: bookId } });
    return result === null || result === void 0 ? void 0 : result.wishList;
});
const addToSavedList = (_id, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id }, { $addToSet: { saved: bookId } });
    return result === null || result === void 0 ? void 0 : result.saved;
});
exports.userService = {
    getWishList,
    getSavedList,
    addToWishList,
    addToSavedList,
};
