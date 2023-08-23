import { Buidling } from '@prisma/client';
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
  sendResponse<Buidling[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getSingleDB(req.params.id);
  sendResponse<Buidling>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Building Fetched successfully!',
    data: result,
  });
});

const updateDb = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const payload = req.body;
  const result = await BuildingService.updateDb(userId, payload);
  sendResponse<Buidling>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated successfully!',
    data: result,
  });
});

const deleteDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await BuildingService.deleteDB(userId);
  sendResponse<Buidling>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building deleted successfully!',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllFromDb,
  getSingleDB,
  updateDb,
  deleteDB,
};
