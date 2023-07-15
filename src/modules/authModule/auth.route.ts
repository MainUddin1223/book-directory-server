import express from 'express';
import { verifyAuth } from '../../middlewares/auth.middleware';
import { authController } from './auth.controller';
const router = express.Router();

router
  .route('/signup')
  .post(
    authController.register
  );
router
  .route('/login')
  .post(
    authController.login
  );
  router.route('/')
  .get(
    verifyAuth(),authController.auth
  )

export default { authRouter: router };
