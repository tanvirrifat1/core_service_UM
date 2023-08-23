import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterAbleFields } from './building.contants';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully!',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);

  const filters = pick(req.query, buildingFilterAbleFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await BuildingService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllFromDb,
};
