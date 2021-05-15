const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getTaskById = (id) => tasksRepo.getTaskById(id);

const createTask = (title, order, description, userId, boardId, columnId) => tasksRepo.createTask(title, order, description, userId, boardId, columnId);

const updateTask = (id, title, order, description, userId, boardId, columnId) => tasksRepo.updateTask(id, title, order, description, userId, boardId, columnId);

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
