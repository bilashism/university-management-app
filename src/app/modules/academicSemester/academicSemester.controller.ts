import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const academicSemesterController = {
  createAcademicSemester,
};
