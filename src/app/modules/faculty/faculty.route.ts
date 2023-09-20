import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);

// -----------//
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultyController.myCourses
);

router.get(
  '/my-course-students',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultyController.getMyCourseStudents
);

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FacultyValidation.update),
  FacultyController.updatedFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.deletedFaculty
);

router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.interIntoDb
);

// ------------ //

router.post(
  '/:id/assign-courses',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.assignCourses
);
router.delete(
  '/:id/remove-courses',
  validateRequest(FacultyValidation.assignOrRemoveCourses),
  FacultyController.removeCourses
);

export const FacultyRouter = router;
