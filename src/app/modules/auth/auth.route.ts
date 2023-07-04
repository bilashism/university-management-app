import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
export const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);
authRouter.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  authController.refreshToken
);
