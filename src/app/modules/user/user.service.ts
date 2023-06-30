import config from '../../../config/index';
import { ENUM_USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

/**
 * This function creates a new user with an auto-generated ID and default password, and returns the
 * created user object.
 * @param {IUser} user - The `user` parameter is an object of type `IUser` which contains information
 * about the user being created.
 * @returns The function `createUser` returns a Promise that resolves to an `IUser` object or `null`.
 */
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role to student
  user.role = ENUM_USER_ROLES.STUDENT;

  // auto generated incremental id
  const semester = await AcademicSemester.findById(student.academicSemester);
  const id = (await generateStudentId(semester)) as string;
  user.id = id;

  const createdUser = await User.create(user);

  if (!createStudent) {
    throw new ApiError(500, 'Failed to create user!');
  }
  return createdUser;
};

export const userService = {
  createStudent,
};
