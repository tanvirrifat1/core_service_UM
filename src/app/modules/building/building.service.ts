import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IBuildingFilterRequest } from './building.interface';

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllFromDb = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
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

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
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
  const total = await prisma.building.count({ where: whereConditions });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDB = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: { id },
  });
  return result;
};

const updateDb = async (
  id: string,
  payload: Partial<Building>
): Promise<Building | null> => {
  const result = await prisma.building.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteDB = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.delete({
    where: { id },
  });
  return result;
};

export const BuildingService = {
  insertIntoDB,
  getAllFromDb,
  getSingleDB,
  updateDb,
  deleteDB,
};
