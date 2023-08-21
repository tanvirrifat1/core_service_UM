import { AcademicFaculty } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const interIntoDb = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

export const academicFacultyService = {
  interIntoDb,
};
