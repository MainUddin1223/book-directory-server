import express from 'express';
import { verifyAuth } from '../../middlewares/auth.middleware';
import { bookController } from './book.controller';
const router = express.Router();

router.route('/create').post(verifyAuth(), bookController.createBook);
router
  .route('/:id')
  .patch(verifyAuth(), bookController.updateBook)
  .delete(verifyAuth(), bookController.deleteBook)
  .get(verifyAuth(), bookController.getBookById);
router.route('/').get(bookController.getAllBookes);
router.route('/my-books').get(verifyAuth(), bookController.getMyBooks);

export default { bookRouter: router };
