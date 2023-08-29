import { OfferedCourse } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferedCourse } from './offeredCourses.interface';

const insertIntoDB = async (data: ICreateOfferedCourse) => {
  const { courseIds, academicDepartmentId, semesterRegistrationId } = data;

  const result: OfferedCourse[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: { academicDepartmentId, semesterRegistrationId, courseId },
    });

    if (!alreadyExist) {
      const insertOfferedCoursed = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      result.push(insertOfferedCoursed);
    } else if (alreadyExist) {
      throw new Error('This data is already exist');
    }
  });
  return result;
};

export const OfferedCourseService = {
  insertIntoDB,
};
