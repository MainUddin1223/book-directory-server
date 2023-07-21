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
exports.bookController = void 0;
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../utilis/pick"));
const paiganationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
const academicFiltarableFields = ['searchTerm', 'author', 'genre'];
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookData = req.body;
        const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = yield book_service_1.bookService.createBook(Object.assign(Object.assign({}, bookData), { owner: _id }));
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.bookService.getBookById(id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const bookData = req.body;
        const _id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const bookId = req.params.id;
        const result = yield book_service_1.bookService.updateBook(_id, bookId, bookData);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const _id = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const bookId = req.params.id;
        const result = yield book_service_1.bookService.deleteBook(_id, bookId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const getAllBookes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paiganationOptions = (0, pick_1.default)(req.query, paiganationFields);
        const filters = (0, pick_1.default)(req.query, academicFiltarableFields);
        const result = yield book_service_1.bookService.getAllBooks(filters, paiganationOptions);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.bookController = {
    createBook,
    getAllBookes,
    getBookById,
    updateBook,
    deleteBook,
};
