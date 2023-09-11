import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-marks',
  StudentEnrolledCourseMarkController.updateStudentMarks
);

router.patch(
  '/update-final-marks',
  StudentEnrolledCourseMarkController.updateFinalMarks
);

router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarkController.getAllFromDB
);

export const StudentEnrolledCourseMarkRoutes = router;
