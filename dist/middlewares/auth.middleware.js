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
exports.verifyAuth = void 0;
const config_1 = __importDefault(require("../config"));
const jwt_1 = require("../jwt");
const auth_model_1 = require("../modules/authModule/auth.model");
const verifyAuth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwt_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_access_secret);
            req.user = decoded;
            const isUserExist = yield auth_model_1.User.findById({ _id: req.user._id });
            if (!isUserExist) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.verifyAuth = verifyAuth;
