import express, { Router } from 'express';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { userRouter } from '../modules/user/user.route';
import { academicFacultyRouter } from './../modules/academicFaculty/academicFaculty.route';

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
  {
    path: '/academic-department',
    router: academicDepartmentRouter,
  },
];

ROUTES.forEach(({ path, router }) => appRouter.use(path, router));
