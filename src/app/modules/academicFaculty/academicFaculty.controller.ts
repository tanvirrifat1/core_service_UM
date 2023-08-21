import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.contants';
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

const getAllFacultyData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await academicFacultyService.getAllFacultyData(
    filters,
    options
  );

  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    message: 'AcademicFaculty fetched successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await academicFacultyService.getSingleFaculty(userId);

  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    message: 'get academic single faculty successfully',
    success: true,
    data: result,
  });
});

export const AcademicFacultyController = {
  interIntoDb,
  getAllFacultyData,
  getSingleFaculty,
};
