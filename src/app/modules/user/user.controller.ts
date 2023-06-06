import { Request, Response, NextFunction, RequestHandler } from 'express';
import usersService from './user.service';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await usersService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (err) {
    // temporary fix
    // res.status(400).json({
    //   err,
    // });
    next(err);
  }
};
