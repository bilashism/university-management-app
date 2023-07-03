import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.ENV === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: others,
    message: 'Login successful',
  });
  // sendResponse<IAdmin[]>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Admins retrieved successfully !',
  //   meta: result.meta,
  //   data: result.data,
  // });
});

export const authController = { loginUser };
