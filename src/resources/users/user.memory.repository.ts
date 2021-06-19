import { Users } from '../../entities/user';
import { tryDBConnect } from '../../helpers/db';

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
  const user = await userRepository.create({ name, login, password });
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
  await userRepository.update(id, { name, login, password });
  return user;
};

const deleteUser = async (id: string): Promise<void> => {
  const userRepository = await userRepositoryPromise;
  await userRepository.findOneOrFail(id);
  await userRepository.delete(id);
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
