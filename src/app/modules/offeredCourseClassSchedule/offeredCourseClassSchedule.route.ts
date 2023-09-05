import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.get('/:id', OfferedCourseClassScheduleController.getByIdFromDB);
router.get('/', OfferedCourseClassScheduleController.getAllFromDB);
router.post('/create', OfferedCourseClassScheduleController.insertIntoDB);

export const OfferedCourseClassScheduleRoutes = router;
