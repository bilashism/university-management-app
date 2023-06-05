import cors from 'cors';
import express, { Application } from 'express';
import usersRouter from './app/modules/users/users.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully');
//   // throw new APIError(410, "I'm an error!");
//   next("I'm an 'express' error!");
// });
// global error handler
app.use(globalErrorHandler);
// Application routes

app.use('/api/v1/users/', usersRouter);

export default app;
