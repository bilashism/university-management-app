import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
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
const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const semester: Partial<IAcademicSemester> = {
    code: '01',
    year: '2025',
  };
  const id = (await generateStudentId(semester)) as string;
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(500, 'Failed to create user!');
  }
  return createdUser;
};

export const userService = {
  createUser,
};
