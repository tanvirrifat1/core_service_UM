import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.get('/', AcademicSemesterController.getAllSemester);
router.post('/create-semester', AcademicSemesterController.insertIntoDb);

export const AcademicSemesterRouter = router;
