import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.create),
  FacultyController.interIntoDb
);

export const FacultyRouter = router;
