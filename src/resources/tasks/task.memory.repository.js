const Task = require('./task.model');

const tasks = [new Task({title: 'ABC', order: 1, description: 'aBc'})]

const getAll = async () => tasks;

const getTaskById = async (id) => tasks.find(task => task.id === id);

const createTask = async (title, order, description, userId, boardId, columnId) => {
    const newTask = new Task({title, order, description, userId, boardId, columnId});
    tasks.push(newTask);
    return newTask;
}

const updateTask = async (id, title, order, description, userId, boardId, columnId) => {
    const taskPresence = tasks.findIndex(task => task.id === id);
    if (taskPresence === -1) {
        throw new Error('Task is not exist!');
    } else {
        tasks[taskPresence].title = title;
        tasks[taskPresence].order = order;
        tasks[taskPresence].description = description;
        tasks[taskPresence].userId = userId;
        tasks[taskPresence].boardId = boardId;
        tasks[taskPresence].columnId = columnId;
        return tasks[taskPresence];
    }
}

const deleteTask = async (id) => {
    const taskPresence = tasks.findIndex(task => task.id === id);
    if (taskPresence === -1) {
        throw new Error('Task is not exist!');
    } else {
        tasks.splice(taskPresence, 1);
    }
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
