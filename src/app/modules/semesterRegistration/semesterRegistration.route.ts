import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get(
  '/get-my-sem-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMySemesterRegCourses
);

router.get(
  '/get-my-reg',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.GETMyReg
);

router.get('/', SemesterRegistrationController.getAllSemester);
router.get('/:id', SemesterRegistrationController.getSingleSemester);
router.delete('/:id', SemesterRegistrationController.deleteSemester);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  SemesterRegistrationController.updateSemester
);

router.post(
  '/',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertIntoDb
);

// --------------------//
// studentSemesterRegistration

router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.StartMyRegistration
);
router.post(
  '/enroll-from-course',
  auth(ENUM_USER_ROLE.STUDENT),
  validateRequest(SemesterRegistrationValidation.enrolledCourse),
  SemesterRegistrationController.enrollIntoCourse
);

router.post(
  '/confirmed-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmedMyRegistration
);

router.post(
  '/withdraw-from-course',
  validateRequest(SemesterRegistrationValidation.enrolledCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withdrawFromCourse
);

router.post(
  '/:id/start-new-registration',
  auth(ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.startNewRegistration
);

export const SemesterRegistrationRoutes = router;
