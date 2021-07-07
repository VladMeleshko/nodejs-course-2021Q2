import jwt from 'jsonwebtoken';
import config from '../common/config';
import loginRepo from './login.memory.repository';

const autoriseUser = async (login: string, password: string): Promise<string> => {
  const user = await loginRepo.autoriseUser(login, password);
  const token = jwt.sign({ userId: user.id, login: user.login }, `${config.JWT_SECRET_KEY}`, {
    expiresIn: '24h',
  });
  return token;
};

export default { autoriseUser };
