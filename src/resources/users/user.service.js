const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @typedef {import('./user.model').UserAccount} UserAccount user's id, name, login.
 */

/**
 * Returns information about all users from the database using the controller function.
 * @returns {Promise<Array.<UserAccount>>} resolved promise with users and their information.
 */

const getAll = () => usersRepo.getAll();

/**
 * Returns information about selected user from the database using the controller function.
 * @param {string} id id of selected user.
 * @returns {Promise<UserAccount>} resolved promise with selected user and his information.
 */

const getUserById = (id) => usersRepo.getUserById(id);

/**
 * Create new user and his information in the database using the controller function.
 * @param {string} name name of new user.
 * @param {string} login login of new user.
 * @param {string} password password of new user.
 * @returns {Promise<UserAccount>} resolved promise with new user and his information.
 */

const createUser = (name, login, password) => usersRepo.createUser(name, login, password);

/**
 * Update user's information in the database using the controller function.
 * @param {string} id id of user, whose information will be update.
 * @param {string} name new name of selected user.
 * @param {string} login new login of selected user.
 * @param {string} password new password of selected user.
 * @returns {Promise<UserAccount>} resolved promise with user and his new information or an error if user is not found.
 */

const updateUser = (id, name, login, password) => usersRepo.updateUser(id, name, login, password);

/**
 * Delete user and all tasks where user was assigned updated to put user's id to null using the controller functions.
 * @param {string} id id of deleted user.
 * @returns {void} return an error or nothing.
 */

const deleteUser = (id) => {
    usersRepo.deleteUser(id);
    tasksRepo.updateUserInTasks(id);
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
