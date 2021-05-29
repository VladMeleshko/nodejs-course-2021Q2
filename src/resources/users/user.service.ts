import usersRepo from './user.memory.repository';
import { UserModel } from './user.model';
// import tasksRepo from './tasks/task.memory.repository';

const getAll = (): Promise<Array<UserModel>> => usersRepo.getAll();

const getUserById = (id: string): Promise<UserModel> => usersRepo.getUserById(id);

const createUser = (name: string, login: string, password: string): Promise<UserModel> =>
  usersRepo.createUser(name, login, password);

const updateUser = (
  id: string,
  name: string,
  login: string,
  password: string,
): Promise<UserModel> => usersRepo.updateUser(id, name, login, password);

const deleteUser = (id: string): void => {
  usersRepo.deleteUser(id);
  //   tasksRepo.updateUserInTasks(id);
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
