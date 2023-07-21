"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.route('/create').post((0, auth_middleware_1.verifyAuth)(), book_controller_1.bookController.createBook);
router
    .route('/:id')
    .patch((0, auth_middleware_1.verifyAuth)(), book_controller_1.bookController.updateBook)
    .delete((0, auth_middleware_1.verifyAuth)(), book_controller_1.bookController.deleteBook)
    .get((0, auth_middleware_1.verifyAuth)(), book_controller_1.bookController.getBookById);
router.route('/').get((0, auth_middleware_1.verifyAuth)(), book_controller_1.bookController.getAllBookes);
exports.default = { bookRouter: router };
