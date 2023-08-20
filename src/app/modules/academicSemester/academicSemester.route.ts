import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterController.getAllSemester);
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createSchema),
  AcademicSemesterController.insertIntoDb
);

export const AcademicSemesterRouter = router;
