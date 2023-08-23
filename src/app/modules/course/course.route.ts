import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.post(
  '/create-course',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDb
);

export const CourseRouter = router;
