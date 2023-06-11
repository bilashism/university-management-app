import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { academicSemesterService } from './academicSemester.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createAcademicSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    });
    next();
  }
);

export const academicSemesterController = {
  createAcademicSemester,
};
