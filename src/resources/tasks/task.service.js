const tasksRepo = require('./task.memory.repository');

/**
 * @import {TaskModel} from './task.model'
 */

/**
 * Returns information about all tasks from the database using the controller function.
 * @returns {Promise<Array.<TaskModel>>} resolved promise with tasks and their information.
 */

const getAll = () => tasksRepo.getAll();

/**
 * Returns information about selected task from the database using the controller function.
 * @param {string} id id of selected task.
 * @returns {Promise<TaskModel>} resolved promise with selected task and its information.
 */

const getTaskById = (id) => tasksRepo.getTaskById(id);

/**
 * Create new task and its information in the database using the controller function.
 * @param {string} title title of new task.
 * @param {number} order order of new task.
 * @param {string} description description of new task.
 * @param {string|null} userId userId of new task.
 * @param {string} boardId boardId of new task.
 * @param {string} columnId columnId of new task.
 * @returns {Promise<TaskModel>} resolved promise with new task and its information.
 */

const createTask = (title, order, description, userId, boardId, columnId) => tasksRepo.createTask(title, order, description, userId, boardId, columnId);

/**
 * Update task's information in the database using the controller function.
 * @param {string} id id of task, which information will be update.
 * @param {string} title new title of selected task.
 * @param {number} order new order of selected task.
 * @param {string} description new description of selected task.
 * @param {string|null} userId new userId of selected task.
 * @param {string} boardId new boardId of selected task.
 * @param {string} columnId new columnId of selected task.
 * @returns {Promise<TaskModel>} resolved promise with task and its new information or an error if task is not found.
 */

const updateTask = (id, title, order, description, userId, boardId, columnId) => tasksRepo.updateTask(id, title, order, description, userId, boardId, columnId);

/**
 * Delete task and its information from the database using the controller function.
 * @param {string} id id of deleted task.
 * @returns {void} return an error or nothing.
 */

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
