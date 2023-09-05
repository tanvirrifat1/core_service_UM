import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ISignInData, ISignInResponse } from './auth.interface';

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const signIn = async (payload: ISignInData): Promise<ISignInResponse> => {
  const { password, email } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found!');
  }

  const { id: userId, role } = isUserExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { token };
};

export const AuthService = {
  signIn,
  createUser,
  getUsers,
};
