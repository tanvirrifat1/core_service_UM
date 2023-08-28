import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get('/', SemesterRegistrationController.getAllSemester);

router.post(
  '/create-semester',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertIntoDb
);

export const SemesterRegistrationRoutes = router;
