"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.route('/signup').post(auth_controller_1.authController.register);
router.route('/login').post(auth_controller_1.authController.login);
router.route('/').get((0, auth_middleware_1.verifyAuth)(), auth_controller_1.authController.auth);
exports.default = { authRouter: router };
