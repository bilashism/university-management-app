import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const isExistingUser = await User.isUserExist(id);

  if (!isExistingUser) {
    throw new ApiError(NOT_FOUND, 'User not found');
  }
  // match password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isExistingUser?.password
  );
  if (isExistingUser.password && !isPasswordMatched) {
    throw new ApiError(UNAUTHORIZED, 'password not matched');
  }
  return {};
};
export const authService = { loginUser };
