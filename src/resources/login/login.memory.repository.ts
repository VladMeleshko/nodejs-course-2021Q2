import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import config from '../../common/config';
import { Users } from '../../entities/user';
import { tryDBConnect } from '../../helpers/db';

const loginRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Users));

const autoriseUser = async (login: string, password: string): Promise<any> => {
  const loginRepository = await loginRepositoryPromise;
  await loginRepository.findOne({ login }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, (_, matches) => {
        if (matches) {
          const token = jwt.sign({ userId: user.id, login: user.login }, 'secret', {
            expiresIn: 60 * 60 * 24,
          });
          return token;
        }
        throw new Error('Unauthorized');
      });
    } else {
      throw new Error('Forbidden');
    }
  });
};

export default { autoriseUser };
