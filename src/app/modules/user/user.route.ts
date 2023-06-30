import express from 'express';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
export const userRouter = express.Router();

//create student
userRouter.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createStudent
);

//create faculty

//create admin
