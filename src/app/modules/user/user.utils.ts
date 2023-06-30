import { ENUM_USER_ROLES } from '../../../enums/user';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

/**
 * This function finds the ID of the last user created in a MongoDB database using Mongoose.
 * @returns The function `findLastUserId` returns the `id` of the most recently created user in the
 * database. If there are no users in the database, it will return `undefined`.
 */
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: ENUM_USER_ROLES.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

/**
 * This TypeScript function generates a new user ID by incrementing the last user ID found in the
 * database.
 * @returns The function `generateUserId` returns a Promise that resolves to a string representing the
 * next available user ID. The user ID is generated by finding the last user ID in the database (using
 * the `findLastUserId` function), incrementing it by 1, and padding it with leading zeros to ensure it
 * is 5 digits long.
 */
export const generateStudentId = async (sem: Partial<IAcademicSemester>) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  if (!sem.year || !sem.code) return;

  incrementedId = `${sem.year.substring(2)}${sem.code}${incrementedId}`;
  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: ENUM_USER_ROLES.FACULTY,
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
