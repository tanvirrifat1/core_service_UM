import { prisma } from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferedCourse } from './offeredCourses.interface';

const insertIntoDB = async (data: ICreateOfferedCourse) => {
  const { courseIds, academicDepartmentId, semesterRegistrationId } = data;

  const result: any[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const insertOfferedCoursed = await prisma.offeredCourse.create({
      data: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });
    result.push(insertOfferedCoursed);
  });
  return result;
};

export const OfferedCourseService = {
  insertIntoDB,
};
