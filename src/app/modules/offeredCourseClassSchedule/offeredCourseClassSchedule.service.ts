import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const alreadyBookedRoomOnDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOffWeek: data.dayOffWeek,
        room: {
          id: data.roomId,
        },
      },
    });

  const existingSlots = alreadyBookedRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOffWeek,
  }));

  const newSlots = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOffWeek,
  };

  if (hasTimeConflict(existingSlots, newSlots)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is already booked');
  }

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      faculty: true,
      offeredCourseSection: true,
      room: true,
      semesterRegistration: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = { insertIntoDB };
