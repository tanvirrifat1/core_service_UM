import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';
import { semesterRegistrationFilterableFields } from './semesterRegistrtation.contants';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDb(req.body);

  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration created successfully',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.body, semesterRegistrationFilterableFields);
  const options = pick(req.body, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SemesterRegistrationService.getAllFromDB(
    filters,
    options
  );

  sendResponse<SemesterRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.getSingleSemester(
    req.params.id
  );

  sendResponse<SemesterRegistration | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single SemesterRegistration get successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.deleteSemester(
    req.params.id
  );

  sendResponse<SemesterRegistration | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration deleted successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDb,
  getAllSemester,
  getSingleSemester,
  deleteSemester,
};
