import { Room } from '@prisma/client';
import { prisma } from '../../../../shared/prisma';

const insertIntoDb = async (data: Room) => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};

export const RoomService = {
  insertIntoDb,
};
