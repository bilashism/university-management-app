import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';

export const academicFacultyRouter = express.Router();

// create faculty
academicFacultyRouter.post('/create', academicFacultyController.createFaculty);

// get faculty
academicFacultyRouter.get('/', academicFacultyController.getFaculty);

// update faculty
academicFacultyRouter.patch('/', academicFacultyController.updateFaculty);

// delete faculty
academicFacultyRouter.delete('/', academicFacultyController.deleteFaculty);
