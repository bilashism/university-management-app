import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const createdSemester = await AcademicSemester.create(payload);

  return createdSemester;
};

export const academicSemesterService = {
  createAcademicSemester,
};
