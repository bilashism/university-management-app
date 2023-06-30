import { Model, ObjectId } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: ObjectId | IStudent;
  // faculty?: ObjectId | IFaculty;
  // admin?: ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
