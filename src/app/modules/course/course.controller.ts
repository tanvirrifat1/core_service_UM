import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.contants';
import { CourseService } from './course.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDb(req.body);

  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const options = pick(req.query, courseFilterableFields);

  const result = await CourseService.getAllFromDB(filters, options);

  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const CourseController = {
  insertIntoDb,
  getAllFromDB,
};
