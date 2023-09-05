import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signIn);
router.post('/create', AuthController.createUser);

export const AuthRoutes = router;
