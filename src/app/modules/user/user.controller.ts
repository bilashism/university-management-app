import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { userService } from './user.service';
// import { z } from 'zod';
/**
 * This function creates a user and returns a success message with the user data.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client. It is
 * an instance of the `http.ServerResponse` class in Node.js. In this code snippet, `res` is used to
 * send a JSON response with a success message and the data returned from the
 * @param next - `next` is a function that is called when an error occurs during the execution of the
 * middleware function. It passes the error to the next middleware function or error handler middleware
 * function in the chain.
 */
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await userService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

export const userController = {
  createStudent,
};
