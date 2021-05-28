const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @typedef {import('./board.model').BoardModel} BoardModel
 * @typedef {import('./board.model').ColumnsModel} ColumnsModel
 */

/**
 * Returns information about all boards from the database using the controller function.
 * @returns {Promise<Array.<BoardModel>>} resolved promise with boards and their information.
 */

const getAll = () => boardsRepo.getAll();

/**
 * Returns information about selected board from the database using the controller function.
 * @param {string} id id of selected board.
 * @returns {Promise<BoardModel>} resolved promise with selected board and its information.
 */

const getBoardById = (id) => boardsRepo.getBoardById(id);

/**
 * Create new board and its information in the database using the controller function.
 * @param {string} title title of new board.
 * @param {Array.<ColumnsModel>} columns columns of new board.
 * @returns {Promise<BoardModel>} resolved promise with new board and its information.
 */

const createBoard = (title, columns) => boardsRepo.createBoard(title, columns);

/**
 * Update board's information in the database using the controller function.
 * @param {string} id id of board, which information will be update.
 * @param {string} title new title of selected board.
 * @param {Array.<ColumnsModel>} columns new columns of selected board.
 * @returns {Promise<BoardModel>} resolved promise with board and its new information or an error if board is not found.
 */

const updateBoard = (id, title, columns) => boardsRepo.updateBoard(id, title, columns);

/**
 * Delete board and its information from the database and all tasks that were in it using the controller functions.
 * @param {string} id id of deleted board.
 * @returns {void} return an error or nothing.
 */

const deleteBoard = (id) => {
    boardsRepo.deleteBoard(id);
    tasksRepo.deleteTasksFromBoard(id);
}

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
