import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/create-course', CourseController.insertIntoDb);

export const CourseRouter = router;
