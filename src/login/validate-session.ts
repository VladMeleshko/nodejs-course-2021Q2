import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';
// import { Users } from '../entities/user';
// import { tryDBConnect } from '../helpers/db';

// const loginRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Users));

const autoriseUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const sessionToken = req.headers.authorization;
  const loginRepository = await loginRepositoryPromise;
  if (!sessionToken) {
    return res.status(403).send('Forbidden');
  }
  jwt.verify(sessionToken, `${config.JWT_SECRET_KEY}`, async (_, decoded) => {
    if (decoded) {
      await loginRepository.findOne({ id: decoded['userId'] }).then(
        user => {
          req.user = user;
          next();
        },
        () => {
          res.status(401).send({ error: 'Unauthorized' });
        },
      );
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  });
};

export default autoriseUser;
