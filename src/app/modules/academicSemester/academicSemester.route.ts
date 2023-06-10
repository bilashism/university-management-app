import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
export const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
  // userController.createUser
);
