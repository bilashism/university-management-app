import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';
export const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester
);

academicSemesterRouter.get(
  '/:id',
  academicSemesterController.getSingleSemester
);
academicSemesterRouter.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester
);
academicSemesterRouter.get('/', academicSemesterController.getAllSemesters);
