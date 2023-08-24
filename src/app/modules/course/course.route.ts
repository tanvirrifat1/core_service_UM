import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getSingleDataFromDb);

router.delete('/:id', CourseController.deleteData);

router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  CourseController.updatedData
);

router.post(
  '/create-course',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDb
);

export const CourseRouter = router;
