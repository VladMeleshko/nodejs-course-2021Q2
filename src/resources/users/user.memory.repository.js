const User = require('./user.model');

const users = [new User({name: 'user', login: 'user', password: 'user'})];

const getAll = async () => users;

const getUserById = async (id) => users.find(user => user.id === id);

const createUser = async (name, login, password) => {
  const newUser = new User({name, login, password});
  users.push(newUser);
  return newUser;
}

const updateUser = async (id, name, login, password) => {
  const userPresence = users.findIndex(user => user.id === id);
  if (userPresence === -1) {
    throw new Error('User is not exist!');
  } else {
    users[userPresence].name = name;
    users[userPresence].login = login;
    users[userPresence].password = password;
    return users[userPresence];
  }
}

const deleteUser = async (id) => {
  const userPresence = users.findIndex(user => user.id === id);
  if (userPresence === -1) {
    throw new Error('User is not exist!');
  } else {
    users.splice(userPresence, 1);
  }
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
