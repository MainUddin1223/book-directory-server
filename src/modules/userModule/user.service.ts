import { User } from '../authModule/auth.model';

const getWishList = async (_id: string) => {
  const result = await User.findById({ _id }).select('wishList');
  return result?.wishList;
};
const getSavedList = async (_id: string) => {
  const result = await User.findById({ _id }).select('saved');
  return result?.saved;
};
const addToWishList = async (_id: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    { _id },
    { $addToSet: { saved: bookId } }
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
