import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import usersRouter from './app/modules/users/users.route';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle errors
class APIError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // res.send('Working Successfully');
  // throw new APIError(410, "I'm an error!");
  next("I'm an 'express' error!");
});
// global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err,
    });
  } else {
    return res.status(500).json({
      error: 'Something went wrong!',
    });
  }
});
// Application routes

app.use('/api/v1/users/', usersRouter);

export default app;
