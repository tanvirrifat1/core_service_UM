import express from 'express';
import { OfferedCourseController } from './offeredCourses.controller';

const router = express.Router();

router.post('/create-course', OfferedCourseController.insertIntoDB);

export const OfferedCoursesRoutes = router;
