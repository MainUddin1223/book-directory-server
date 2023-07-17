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

export const bookController = { createBook, getAllBookes };
