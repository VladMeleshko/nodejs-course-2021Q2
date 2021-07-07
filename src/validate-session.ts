import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './common/config';

export const hashUserPassword = (password: string): string => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
};

const autoriseUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userToken = req.header('authorization')?.split(' ')[1];
  try {
    if (!userToken) throw new Error();
    jwt.verify(userToken, `${config.JWT_SECRET_KEY}`);
    next();
  } catch {
    res.status(401).send('Unauthorized');
  }
};

export default autoriseUser;
