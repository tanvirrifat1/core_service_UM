import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.update),
  FacultyController.updatedFaculty
);
router.delete('/:id', FacultyController.deletedFaculty);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.create),
  FacultyController.interIntoDb
);

export const FacultyRouter = router;
