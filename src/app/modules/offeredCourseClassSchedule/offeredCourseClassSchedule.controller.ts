import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilterableFields } from './offeredCourseClassSchedule.contants';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseClassScheduleService.insertIntoDB(req.body);

  sendResponse<OfferedCourseClassSchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseClassSchedule created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, offeredCourseClassScheduleFilterableFields);
  const options = pick(req.body, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await OfferedCourseClassScheduleService.getAllFromDB(
    filters,
    options
  );

  sendResponse<OfferedCourseClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseClassSchedule fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseClassScheduleService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourseClassSchedule fetched successfully',
    data: result,
  });
});

export const OfferedCourseClassScheduleController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
