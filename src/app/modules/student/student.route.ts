import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';
export const studentRouter = express.Router();

studentRouter.get('/:id', studentController.getSingleStudent);
studentRouter.get('/', studentController.getAllStudents);

studentRouter.delete('/:id', studentController.deleteStudent);
studentRouter.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  studentController.updateStudent
);
