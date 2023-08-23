import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await RoomService.insertIntoDb(data);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

export const RoomController = {
  insertIntoDb,
};
