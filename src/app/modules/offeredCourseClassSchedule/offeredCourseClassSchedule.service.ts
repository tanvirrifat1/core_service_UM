import { OfferedCourseClassSchedule } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
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
