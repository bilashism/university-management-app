import express from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middlewares/validateRequest';
export const userRouter = express.Router();

userRouter.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);

// export { userRouter };
