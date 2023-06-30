import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import { ENUM_USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
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

  const semester = await AcademicSemester.findById(student.academicSemester);
  let newStudentAllData = null;
  // auto generated incremental id
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = (await generateStudentId(semester)) as string;
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Student not created'
      );
    }
    newStudentAllData = newStudent[0];
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not created');
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (newStudentAllData) {
    newStudentAllData = await User.findOne({
      id: newStudentAllData.id,
    }).populate({
      path: 'student',
      populate: [
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
        { path: 'academicSemester' },
      ],
    });
  }

  return newStudentAllData;
};

export const userService = {
  createStudent,
};
