import cors from 'cors';
import express, { Application } from 'express';
import usersRouter from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import ApiError from './errors/ApiError';
const app: Application = express();

app.use(cors());
// con uhuof
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Testing fhgh
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.send('Working Successfully');
  throw new ApiError(410, "I'm an error!");
  // next("I'm an 'express' error!");
});
// global error handler
// Application routes

app.use('/api/v1/users', usersRouter);

app.use(globalErrorHandler);

export default app;
