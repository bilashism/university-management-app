import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { userRouter } from './app/modules/user/user.route';
import config from './config';
// import ApiError from './errors/ApiError';
const app: Application = express();

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully');
//   throw new ApiError(410, "I'm an error!");
//   // next("I'm an 'express' error!");
// });

app.use(`${config.API_PREFIX}/user`, userRouter);

// global error handler (must come after all routes middleware)
app.use(globalErrorHandler);

export default app;
