import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { CourseRouter } from '../modules/course/course.route';
import { FacultyRouter } from '../modules/faculty/faculty.route';
import { OfferedCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { OfferedCoursesRoutes } from '../modules/offeredCourses/offeredCourses.route';
import { RoomRouters } from '../modules/room/room.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { studentRoutes } from '../modules/student/student.route';
import { StudentEnrolledCourseMarkRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/building',
    route: BuildingRoutes,
  },
  {
    path: '/rooms',
    route: RoomRouters,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCoursesRoutes,
  },
  {
    path: '/offered-course-section',
    route: OfferedCourseSectionRoutes,
  },
  {
    path: '/offered-course-schedule',
    route: OfferedCourseClassScheduleRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/student-enrolled-course-marks',
    route: StudentEnrolledCourseMarkRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
