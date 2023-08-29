import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourses.controller';
import { OfferedCourseValidations } from './offeredCourses.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(OfferedCourseValidations.create),
  OfferedCourseController.insertIntoDB
);

export const OfferedCoursesRoutes = router;
