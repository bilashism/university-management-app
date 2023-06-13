import { academicFacultyRouter } from './../modules/academicFaculty/academicFaculty.route';
import express, { Router } from 'express';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { userRouter } from '../modules/user/user.route';

export const appRouter: Router = express.Router();

type IRoute = {
  path: string;
  router: Router;
};

const ROUTES: IRoute[] = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/academic-semester',
    router: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRouter,
  },
];

ROUTES.forEach(({ path, router }) => appRouter.use(path, router));
