const Task = require('./task.model');

let tasks = [new Task({title: 'ABC', order: 1, description: 'aBc'})]

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
        const newTask = {...tasks[taskPresence], title, order, description, userId, boardId, columnId};
        tasks.splice(taskPresence, 1, newTask);
        return newTask;
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

const deleteTasksFromBoard = async (boardId) => {
    const boardTasks = tasks.filter(task => task.boardId === boardId);
    if (boardTasks.length === 0) {
        throw new Error('Board is not exist!');
    } else {
        tasks = tasks.filter(task => !boardTasks.includes(task));
        return tasks;
    }
}

const updateUserInTasks = async (userId) => {
    const userTasks = tasks.filter(task => task.userId === userId);
    if (userTasks.length === 0) {
        throw new Error('User is not exist!');
    } else {
        tasks = tasks.map(task => {
            if (userTasks.includes(task)) {
                const newTask = {...task, userId: null};
                return newTask;
            } 
                return task;
            
        });
        return tasks;
    }
}

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask, deleteTasksFromBoard, updateUserInTasks };
