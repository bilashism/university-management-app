import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  IGlobalErrorResponse,
  globalErrorHandler,
} from './app/middlewares/globalErrorHandler';
import { IAcademicSemester } from './app/modules/academicSemester/academicSemester.interface';
import { generateFacultyId } from './app/modules/user/user.utils';
import { appRouter } from './app/routes';
import config from './config';
const app: Application = express();

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use(`${config.API_PREFIX}`, appRouter);

const acaSem: Partial<IAcademicSemester> = {
  code: '01',
  year: '2020',
};
const testId = async () => {
  const test = await generateFacultyId();
  console.log(test);
};
testId();
// global error handler (must come after all routes middleware)
app.use(globalErrorHandler);

// not found routes handler
app.use((req: Request, res: Response) => {
  const notFoundResponseData: IGlobalErrorResponse = {
    success: false,
    message: 'The requested route was not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'The requested route does not exist',
      },
    ],
    stack: undefined,
  };
  res.status(httpStatus.NOT_FOUND).json(notFoundResponseData);
});

export default app;
