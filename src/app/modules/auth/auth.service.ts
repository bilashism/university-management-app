import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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

  //create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isExistingUser;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
export const authService = { loginUser };
