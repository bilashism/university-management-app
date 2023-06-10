import { RequestHandler } from 'express';
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
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await userService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
