import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post('/create-semester', SemesterRegistrationController.insertIntoDb);

export const SemesterRegistrationRoutes = router;
