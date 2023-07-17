import express from 'express';
import { verifyAuth } from '../../middlewares/auth.middleware';
import { bookController } from './book.controller';
const router = express.Router();

router.route('/create').post(verifyAuth(), bookController.createBook);
router.route('/').get(verifyAuth(), bookController.getAllBookes);

export default { bookRouter: router };
