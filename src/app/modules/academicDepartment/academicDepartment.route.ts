import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

export const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
);

academicDepartmentRouter.get(
  '/:id',
  AcademicDepartmentController.getSingleDepartment
);

academicDepartmentRouter.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
);

academicDepartmentRouter.delete(
  '/:id',
  AcademicDepartmentController.deleteDepartment
);

academicDepartmentRouter.get(
  '/',
  AcademicDepartmentController.getAllDepartments
);
