import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
export const userRouter = express.Router();

userRouter.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);

// export { userRouter };
