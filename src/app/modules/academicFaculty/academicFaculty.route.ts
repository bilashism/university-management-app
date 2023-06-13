import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

export const academicFacultyRouter = express.Router();

// create faculty
academicFacultyRouter.post(
  '/create',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.createFaculty
);

// get faculty
academicFacultyRouter.get('/:id', academicFacultyController.getSingleFaculty);
academicFacultyRouter.get('/', academicFacultyController.getAllFaculties);

// update faculty
academicFacultyRouter.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.updateFaculty
);

// delete faculty
academicFacultyRouter.delete('/:id', academicFacultyController.deleteFaculty);
