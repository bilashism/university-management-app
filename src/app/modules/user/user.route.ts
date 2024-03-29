import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLES } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
