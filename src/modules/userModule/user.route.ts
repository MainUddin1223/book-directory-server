import express from 'express';
import { verifyAuth } from '../../middlewares/auth.middleware';
import { userController } from './user.controller';
const router = express.Router();

router.route('/wish-list').get(verifyAuth(), userController.getWishList);
router.route('/saved-list').get(verifyAuth(), userController.getsavedList);
router.route('/wish-list/:id').put(verifyAuth(), userController.addToWishList);
router
  .route('/saved-list/:id')
  .put(verifyAuth(), userController.addToSavedList);

export default { userRouter: router };
