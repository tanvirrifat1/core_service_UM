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

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseService.getSingleData(id);

  sendResponse<OfferedCourse | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single OfferedCourse successfully!',
    data: result,
  });
});

const updatedData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updatedData(id, req.body);

  sendResponse<OfferedCourse | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated OfferedCourse successfully!',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseService.deleteData(id);

  sendResponse<OfferedCourse | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted OfferedCourse successfully!',
    data: result,
  });
});

export const OfferedCourseController = {
  insertIntoDB,
  getAllFromDb,
  getSingleData,
  updatedData,
  deleteData,
};
