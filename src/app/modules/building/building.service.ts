import { Buidling, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IBuildingFilterRequest } from './building.interface';

const insertIntoDB = async (data: Buidling): Promise<Buidling> => {
  const result = await prisma.buidling.create({
    data,
  });
  return result;
};

const getAllFromDb = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Buidling[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuidlingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.buidling.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.buidling.count({ where: whereConditions });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDB = async (id: string): Promise<Buidling | null> => {
  const result = await prisma.buidling.findUnique({
    where: { id },
  });
  return result;
};

const updateDb = async (
  id: string,
  payload: Partial<Buidling>
): Promise<Buidling | null> => {
  const result = await prisma.buidling.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const BuildingService = {
  insertIntoDB,
  getAllFromDb,
  getSingleDB,
  updateDb,
};
