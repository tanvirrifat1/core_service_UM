import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourses.controller';
import { OfferedCourseValidations } from './offeredCourses.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllFromDb);
router.get('/:id', OfferedCourseController.getSingleData);
router.delete('/:id', OfferedCourseController.deleteData);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.update),
  OfferedCourseController.updatedData
);

router.post(
  '/create-course',
  validateRequest(OfferedCourseValidations.create),
  OfferedCourseController.insertIntoDB
);

export const OfferedCoursesRoutes = router;
