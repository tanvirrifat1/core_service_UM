import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionFilterableFields } from './offeredCourseSection.contants';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertIntoDb(req.body);

  sendResponse<OfferedCourseSection>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferCourseSections created successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.getByIdFromDB(req.params.id);

  sendResponse<OfferedCourseSection>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single OfferCourseSections successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.updateOneInDB(
    req.params.id,
    req.body
  );

  sendResponse<OfferedCourseSection>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferCourseSections updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.deleteByIdFromDB(
    req.params.id
  );

  sendResponse<OfferedCourseSection>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferCourseSections deleted successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, offeredCourseSectionFilterableFields);
  const options = pick(req.body, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OfferedCourseSectionService.getAllFromDB(
    filters,
    options
  );
  sendResponse<OfferedCourseSection[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferCourseSections fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const OfferedCourseSectionController = {
  insertIntoDb,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
