import { Buidling } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: Buidling): Promise<Buidling> => {
  const result = await prisma.buidling.create({
    data,
  });
  return result;
};

export const BuildingService = {
  insertIntoDB,
};
