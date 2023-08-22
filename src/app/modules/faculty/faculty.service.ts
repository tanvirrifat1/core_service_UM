import { Faculty } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const interIntoDb = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

export const FacultyService = {
  interIntoDb,
};
