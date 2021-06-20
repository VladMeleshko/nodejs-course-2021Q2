import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { Users } from '../../entities/user';
import { Tasks } from '../../entities/task';

const getAll = (): Promise<Users[]> => usersRepo.getAll();

const getUserById = (id: string): Promise<Users> => usersRepo.getUserById(id);

const createUser = (name: string, login: string, password: string): Promise<Users> =>
  usersRepo.createUser(name, login, password);

const updateUser = (id: string, name: string, login: string, password: string): Promise<Users> =>
  usersRepo.updateUser(id, name, login, password);

const deleteUser = async (
  id: string,
): Promise<[PromiseSettledResult<void>, PromiseSettledResult<Tasks[]>]> =>
  Promise.allSettled([usersRepo.deleteUser(id), tasksRepo.updateUserInTasks(id)]);

export default { getAll, getUserById, createUser, updateUser, deleteUser };
