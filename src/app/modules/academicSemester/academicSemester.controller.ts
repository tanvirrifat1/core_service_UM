import { AcademicSemester } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AcademicSemesterService.insertIntoDb(req.body);
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic-semester created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'code',
    'title',
    'startMonth',
    'endMonth',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AcademicSemesterService.getAllSemester(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic-semester fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const userID = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(userID);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic-semester get single data successfully!',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const userID = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(userID);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic-semester deleted successfully!',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const userID = req.params.id;
  const data = req.body;
  const result = await AcademicSemesterService.updateData(userID, data);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic-semester deleted successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDb,
  getAllSemester,
  getSingleSemester,
  deleteSemester,
  updateSemester,
};
