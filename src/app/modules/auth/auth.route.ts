import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.get('/', AuthController.getUsers);
router.post(
  '/signup',
  // validateRequest(AuthValidation.signIn),
  AuthController.signIn
);
router.post(
  '/create',
  validateRequest(AuthValidation.create),
  AuthController.createUser
);

export const AuthRoutes = router;
