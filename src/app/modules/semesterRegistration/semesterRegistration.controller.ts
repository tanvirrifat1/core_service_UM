import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

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
  const result = await SemesterRegistrationService.getAllSemester();

  sendResponse<SemesterRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration fetched successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDb,
  getAllSemester,
};
