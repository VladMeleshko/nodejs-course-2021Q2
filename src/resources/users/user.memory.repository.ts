import { Users } from '../../entities/user';
import { tryDBConnect } from '../../helpers/db';
import { hashUserPassword } from '../../validate-session';

const userRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Users));

const getAll = async (): Promise<Users[]> => {
  const userRepository = await userRepositoryPromise;
  const users = await userRepository.find();
  return users;
};

const getUserById = async (id: string): Promise<Users> => {
  const userRepository = await userRepositoryPromise;
  const user = await userRepository.findOneOrFail(id);
  return user;
};

const createUser = async (name: string, login: string, password: string): Promise<Users> => {
  const userRepository = await userRepositoryPromise;
  const hashPassword = hashUserPassword(password);
  const user = await userRepository.create({
    name,
    login,
    password: hashPassword,
  });
  await userRepository.save(user);
  return user;
};

const updateUser = async (
  id: string,
  name: string,
  login: string,
  password: string,
): Promise<Users> => {
  const userRepository = await userRepositoryPromise;
  const user = await userRepository.findOneOrFail(id);
  const hashPassword = hashUserPassword(password);
  await userRepository.update(id, { name, login, password: hashPassword });
  return user;
};

const deleteUser = async (id: string): Promise<void> => {
  const userRepository = await userRepositoryPromise;
  await userRepository.findOneOrFail(id);
  await userRepository.delete(id);
};

export const toResponse = (user: Users): { id: string; name: string; login: string } => {
  const { id, name, login } = user;
  return { id, name, login };
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
