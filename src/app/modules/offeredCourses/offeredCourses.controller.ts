import { OfferedCourse } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseFilterableFields } from './offeredCourses.constants';
import { OfferedCourseService } from './offeredCourses.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.insertIntoDB(req.body);

  sendResponse<OfferedCourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse created successfully!',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, offeredCourseFilterableFields);
  const options = pick(req.body, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OfferedCourseService.getAllFromDb(filters, options);

  sendResponse<OfferedCourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const OfferedCourseController = { insertIntoDB, getAllFromDb };
