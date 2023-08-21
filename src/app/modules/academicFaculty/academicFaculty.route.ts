import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFacultyData);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch('/:id', AcademicFacultyController.updateOneInDB);

router.post(
  '/create-academicFaculty',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.interIntoDb
);

export const AcademicFacultyRoutes = router;
