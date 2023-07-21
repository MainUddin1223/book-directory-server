"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.route('/wish-list').get((0, auth_middleware_1.verifyAuth)(), user_controller_1.userController.getWishList);
router.route('/saved-list').get((0, auth_middleware_1.verifyAuth)(), user_controller_1.userController.getsavedList);
router.route('/wish-list/:id').put((0, auth_middleware_1.verifyAuth)(), user_controller_1.userController.addToWishList);
router
    .route('/saved-list/:id')
    .put((0, auth_middleware_1.verifyAuth)(), user_controller_1.userController.addToSavedList);
exports.default = { userRouter: router };
