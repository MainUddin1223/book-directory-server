import { NextFunction, Request, Response } from 'express';
import { bookService } from './book.service';
import pick from '../../utilis/pick';
const paiganationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
const academicFiltarableFields = ['searchTerm', 'author', 'genre'];

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = req.body;
    const _id = req.user?._id;
    const result = await bookService.createBook({ ...bookData, owner: _id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await bookService.getBookById(id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = req.body;
    const _id = req.user?._id;
    const bookId = req.params.id;
    const result = await bookService.updateBook(
      _id,
      bookId as string,
      bookData
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.user?._id;
    const bookId = req.params.id;
    const result = await bookService.deleteBook(_id, bookId as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getMyBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paiganationOptions = pick(req.query, paiganationFields);
    const filters = pick(req.query, academicFiltarableFields);
    const id = req.user?._id;
    const result = await bookService.getMyBooks(
      filters,
      paiganationOptions,
      id
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllBookes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paiganationOptions = pick(req.query, paiganationFields);
    const filters = pick(req.query, academicFiltarableFields);
    const result = await bookService.getAllBooks(filters, paiganationOptions);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const bookController = {
  createBook,
  getAllBookes,
  getBookById,
  updateBook,
  deleteBook,
  getMyBooks,
};
