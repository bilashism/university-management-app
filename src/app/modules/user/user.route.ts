import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
export const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createStudent
);

// export { userRouter };
