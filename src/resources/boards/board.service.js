const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoardById = (id) => boardsRepo.getBoardById(id);

const createBoard = (title, columns) => boardsRepo.createBoard(title, columns);

const updateBoard = (id, title, columns) => boardsRepo.updateBoard(id, title, columns);

const deleteBoard = (id) => {
    boardsRepo.deleteBoard(id);
    tasksRepo.deleteTasksFromBoard(id);
}

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
