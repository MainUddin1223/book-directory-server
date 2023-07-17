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
exports.authController = void 0;
const jwt_1 = require("../../jwt");
const auth_model_1 = require("./auth.model");
const config_1 = __importDefault(require("../../config"));
const { jwt_access_secret, jwt_access_expires_in } = config_1.default.jwt;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const getUser = yield auth_model_1.User.findById(_id).select('-password');
        if (getUser === null || getUser === void 0 ? void 0 : getUser.email) {
            const userData = { _id: getUser._id, email: getUser.email };
            const token = jwt_1.jwtHelpers.createJwtToken(userData, jwt_access_secret, jwt_access_expires_in);
            res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (email && password) {
            const isExist = yield auth_model_1.User.findOne({ email }).select('-password');
            console.log('isExist', isExist);
            if (isExist) {
                const matchPassword = isExist.password === password;
                if (!matchPassword) {
                    throw new Error('Invalid password');
                }
                else {
                    const userData = { _id: isExist._id, email: isExist.email };
                    const token = jwt_1.jwtHelpers.createJwtToken(userData, jwt_access_secret, jwt_access_expires_in);
                    res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
                }
            }
            else {
                throw new Error("User already exist");
            }
        }
        else {
            throw new Error("Email and Password needed ");
        }
    }
    catch (error) {
        next(error);
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isExist = yield auth_model_1.User.findOne({ email });
        if (isExist) {
            throw new Error("User already exist");
        }
        else {
            const user = yield auth_model_1.User.create({ email, password });
            const userData = { _id: user._id, email: user.email };
            const token = jwt_1.jwtHelpers.createJwtToken(userData, jwt_access_secret, jwt_access_expires_in);
            res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.authController = { register, auth, login };
