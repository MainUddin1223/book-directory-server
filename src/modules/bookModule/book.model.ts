import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = model('book', bookSchema);
