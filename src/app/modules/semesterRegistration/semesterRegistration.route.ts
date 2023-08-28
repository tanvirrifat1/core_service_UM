import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get('/', SemesterRegistrationController.getAllSemester);
router.get('/:id', SemesterRegistrationController.getSingleSemester);
router.delete('/:id', SemesterRegistrationController.deleteSemester);

router.post(
  '/create-semester',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertIntoDb
);

export const SemesterRegistrationRoutes = router;
