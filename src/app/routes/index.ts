import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
