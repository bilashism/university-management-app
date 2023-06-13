/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.createFaculty(req.body);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getFaculty = () => {};
const updateFaculty = () => {};
const deleteFaculty = () => {};

export const academicFacultyController = {
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
