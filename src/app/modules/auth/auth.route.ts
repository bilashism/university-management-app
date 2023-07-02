import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
export const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);
