import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { handleValidationError } from '../../errors/handleValidationError';
import { ErrorMessage } from '../../interfaces/error';
import ApiError from '../../errors/ApiError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(400).json({ err });
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMesages: ErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    message = err?.message;
    statusCode = err?.statusCode;
    errorMessages = message ? [{ path: '', message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = message ? [{ path: '', message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};
