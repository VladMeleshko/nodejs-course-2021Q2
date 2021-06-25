import bcrypt from 'bcrypt';
import { Users } from '../entities/user';
import { tryDBConnect } from '../helpers/db';

const loginRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Users));

const autoriseUser = async (login: string, password: string): Promise<Users> => {
  const loginRepository = await loginRepositoryPromise;
  const user = await loginRepository.findOneOrFail({ login }).catch(() => {
    throw new Error('User not found!');
  });
  const matches = bcrypt.compareSync(password, user.password);
  if (!matches) throw new Error('Login or password incorrect!');
  return user;
};

export default { autoriseUser };
