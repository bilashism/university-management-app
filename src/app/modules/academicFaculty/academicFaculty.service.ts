/* eslint-disable @typescript-eslint/no-empty-function */
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getFaculty = () => {};
const updateFaculty = () => {};
const deleteFaculty = () => {};

export const academicFacultyService = {
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
