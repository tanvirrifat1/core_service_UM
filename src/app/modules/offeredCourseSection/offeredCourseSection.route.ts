import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';

const router = express.Router();

router.get('/', OfferedCourseSectionController.getAllFromDB);
router.get('/:id', OfferedCourseSectionController.getByIdFromDB);
router.delete('/:id', OfferedCourseSectionController.deleteByIdFromDB);
router.patch(
  '/:id',
  validateRequest(OfferedCourseSectionValidation.update),
  OfferedCourseSectionController.updateOneInDB
);

router.post(
  '/',
  validateRequest(OfferedCourseSectionValidation.create),
  OfferedCourseSectionController.insertIntoDb
);

export const OfferedCourseSectionRoutes = router;
