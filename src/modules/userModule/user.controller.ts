import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

const getWishList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?._id;
    const result = await userService.getWishList(id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const getsavedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?._id;
    const result = await userService.getSavedList(id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const addToSavedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;
    const id = req.user?._id;
    const result = await userService.addToSavedList(id as string, bookId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const addToWishList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;
    const id = req.user?._id;
    const result = await userService.addToWishList(id as string, bookId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const userController = {
  getWishList,
  getsavedList,
  addToSavedList,
  addToWishList,
};
