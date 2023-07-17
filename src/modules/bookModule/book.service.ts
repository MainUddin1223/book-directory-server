import { SortOrder } from 'mongoose';
import { pagination } from '../../utilis/pagination';
import { Book } from './book.model';
type IBook = {
  title: string;
  author: string;
  gnere: string;
  publicationDate: Date;
  reviews: string;
};
type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
type IFilters = {
  searchTerm?: string;
};
const createBook = (payload: IBook) => {
  const result = Book.create(payload);
  return result;
};
const getAllBooks = async (
  filters: IFilters,
  paiganationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: ['title'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    pagination.calculatePagination(paiganationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const bookService = { createBook, getAllBooks };
