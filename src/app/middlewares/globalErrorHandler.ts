/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { handleValidationError } from '../../errors/handleValidationError';
import { ErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import { handleZodError } from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';

export type IGlobalErrorResponse = {
  success: false;
  message: string;
  errorMessages: ErrorMessage[];
  stack?: string | undefined;
};

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // res.status(400).json({ err });
  if (config.env === 'development') {
    console.log('💔 global error handler ~ ', error);
  } else {
    errorLogger.error('💔 global error handler ~ ', error);
  }
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: ErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
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

  const responseData: IGlobalErrorResponse = {
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  };

  res.status(statusCode).json(responseData);

  // next();
};
