import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
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
