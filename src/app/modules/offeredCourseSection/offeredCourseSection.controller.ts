import { OfferedCourseSection } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const OfferedCourseSectionController = { insertIntoDb };
