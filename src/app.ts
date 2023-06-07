import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import usersRouter from './app/modules/user/user.route';
// import ApiError from './errors/ApiError';
const app: Application = express();

app.use(cors());
// con uhuof
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully');
//   throw new ApiError(410, "I'm an error!");
//   // next("I'm an 'express' error!");
// });

app.use('/api/v1/users', usersRouter);

// global error handler
// globalErrorHandler must come after all routes middleware
app.use(globalErrorHandler);

export default app;
