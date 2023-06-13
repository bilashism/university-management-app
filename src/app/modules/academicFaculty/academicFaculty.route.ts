import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';

export const academicFacultyRouter = express.Router();

// create faculty
academicFacultyRouter.post(
  '/create',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.createFaculty
);

// get faculty
academicFacultyRouter.get('/', academicFacultyController.getFaculty);

// update faculty
academicFacultyRouter.patch('/', academicFacultyController.updateFaculty);

// delete faculty
academicFacultyRouter.delete('/', academicFacultyController.deleteFaculty);
