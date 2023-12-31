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

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.updateSemester(
    req.params.id,
    req.body
  );

  sendResponse<SemesterRegistration | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration updated successfully',
    data: result,
  });
});

// --------------------//
// studentSemesterRegistration

const StartMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.StartMyRegistration(
    user.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'studentSemesterRegistration created successfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.enrollIntoCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'studentSemesterRegistrationCourse enroll successfully',
    data: result,
  });
});

const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.withdrewFromCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Withdraw from successfully',
    data: result,
  });
});

const confirmedMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.confirmedMyRegistration(
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'confirmed my registration',
      data: result,
    });
  }
);

const GETMyReg = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await SemesterRegistrationService.GETMyReg(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data fatched!',
    data: result,
  });
});

const startNewRegistration = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.startNewRegistration(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration successfully!',
    data: result,
  });
});

const getMySemesterRegCourses = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await SemesterRegistrationService.getMySemesterRegCourses(
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'MySemesterRegCourses data fetched successfully!',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  insertIntoDb,
  getAllSemester,
  getSingleSemester,
  getMySemesterRegCourses,
  deleteSemester,
  updateSemester,
  withdrawFromCourse,
  StartMyRegistration,
  enrollIntoCourse,
  confirmedMyRegistration,
  GETMyReg,
  startNewRegistration,
};
