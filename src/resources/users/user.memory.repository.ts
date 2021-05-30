import User, { UserModel } from './user.model';

const users: UserModel[] = [];

const getAll = async (): Promise<UserModel[]> => users;

const getUserById = async (id: string): Promise<UserModel> => {
  const user = users.find(userItem => userItem.id === id);
  if (!user) {
    throw new Error('User is not exist!');
  } else {
    return user;
  }
};

const createUser = async (name: string, login: string, password: string): Promise<UserModel> => {
  const newUser = new User({ name, login, password });
  users.push(newUser);
  return newUser;
};

const updateUser = async (
  id: string,
  name: string,
  login: string,
  password: string,
): Promise<UserModel> => {
  const userPresence = users.findIndex(user => user.id === id);
  const user = users[userPresence];
  if (!user) {
    throw new Error('User is not exist!');
  } else {
    const newUser = { ...user, name, login, password };
    users.splice(userPresence, 1, newUser);
    return newUser;
  }
};

const deleteUser = async (id: string): Promise<void> => {
  const userPresence = users.findIndex(user => user.id === id);
  if (userPresence === -1) {
    throw new Error('User is not exist!');
  } else {
    users.splice(userPresence, 1);
  }
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
