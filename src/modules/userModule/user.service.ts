import mongoose from 'mongoose';
import { User } from '../authModule/auth.model';
import { Book } from '../bookModule/book.model';

const getWishList = async (_id: string) => {
  const user = await User.findById({ _id }).select('wishList');
  const result = Book.find({ _id: { $in: user?.wishList } });
  return result;
};
const getSavedList = async (_id: string) => {
  const user = await User.findById({ _id }).select('saved');
  if (!user || !user.saved) {
    return [];
  }
  const savedIds = user.saved.map(id => new mongoose.Types.ObjectId(id));
  const savedBooks = await Book.find({ _id: { $in: savedIds } });

  return savedBooks;
};
const addToWishList = async (_id: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    { _id },
    { $addToSet: { wishList: bookId } }
  );
  return result?.wishList;
};
const addToSavedList = async (_id: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    { _id },
    { $addToSet: { saved: bookId } }
  );
  return result?.saved;
};
export const userService = {
  getWishList,
  getSavedList,
  addToWishList,
  addToSavedList,
};
