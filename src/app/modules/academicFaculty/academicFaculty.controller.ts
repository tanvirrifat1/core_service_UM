import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const interIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.interIntoDb(req.body);

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'AcademicFaculty created successfully',
    success: true,
    data: result,
  });
});

export const AcademicFacultyController = {
  interIntoDb,
};
