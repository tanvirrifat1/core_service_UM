import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post('/create', OfferedCourseClassScheduleController.insertIntoDB);

export const OfferedCourseClassScheduleRoutes = router;
