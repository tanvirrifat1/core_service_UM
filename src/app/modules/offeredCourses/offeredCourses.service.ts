import { OfferedCourse, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  offeredCourseRelationalFields,
  offeredCourseRelationalFieldsMapper,
  offeredCourseSearchableFields,
} from './offeredCourses.constants';
import {
  ICreateOfferedCourse,
  IOfferedCourseFilterRequest,
} from './offeredCourses.interface';

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

const getAllFromDb = async (
  filters: IOfferedCourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourse[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourse.findMany({
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.offeredCourse.count({ where: whereConditions });

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.findUnique({
    where: { id },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleteData = async (id: string): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.delete({
    where: { id },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const updatedData = async (
  id: string,
  payload: Partial<OfferedCourse>
): Promise<OfferedCourse | null> => {
  const result = await prisma.offeredCourse.update({
    where: { id },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const OfferedCourseService = {
  insertIntoDB,
  getAllFromDb,
  getSingleData,
  updatedData,
  deleteData,
};
