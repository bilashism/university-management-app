import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { handleValidationError } from '../../errors/handleValidationError';
import { ErrorMessage } from '../../interfaces/error';
import ApiError from '../../errors/ApiError';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // res.status(400).json({ err });
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: ErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    message = error?.message;
    statusCode = error?.statusCode;
    errorMessages = message ? [{ path: '', message }] : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = message ? [{ path: '', message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};
