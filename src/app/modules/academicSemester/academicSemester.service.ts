import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDb = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const getAllSemester = async () => {
  const Result = await prisma.academicSemester.findMany({});
  return Result;
};

export const AcademicSemesterService = {
  insertIntoDb,
  getAllSemester,
};
