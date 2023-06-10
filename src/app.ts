import cors from 'cors';
import express, { Application } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { appRouter } from './app/routes';
import config from './config';
const app: Application = express();

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use(`${config.API_PREFIX}`, appRouter);

// global error handler (must come after all routes middleware)
app.use(globalErrorHandler);

export default app;
