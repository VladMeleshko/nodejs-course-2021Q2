import Task, { TaskModel } from './task.model';

let tasks: TaskModel[] = [];

const getAll = async (): Promise<TaskModel[]> => tasks;

const getTaskById = async (id: string): Promise<TaskModel> => {
  const task = tasks.find(taskItem => taskItem.id === id);
  if (!task) {
    throw new Error('Task is not exist!');
  } else {
    return task;
  }
};

const createTask = async (
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string,
  columnId: string,
): Promise<TaskModel> => {
  const newTask = new Task({ title, order, description, userId, boardId, columnId });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string,
  columnId: string,
): Promise<TaskModel> => {
  const taskPresence = tasks.findIndex(task => task.id === id);
  const task = tasks[taskPresence];
  if (!task) {
    throw new Error('Task is not exist!');
  } else {
    const newTask = {
      ...task,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
    tasks.splice(taskPresence, 1, newTask);
    return newTask;
  }
};

const deleteTask = async (id: string): Promise<void> => {
  const taskPresence = tasks.findIndex(task => task.id === id);
  if (taskPresence === -1) {
    throw new Error('Task is not exist!');
  } else {
    tasks.splice(taskPresence, 1);
  }
};

const deleteTasksFromBoard = async (boardId: string): Promise<TaskModel[]> => {
  const boardTasks = tasks.filter(task => task.boardId === boardId);
  if (boardTasks.length === 0) {
    throw new Error('Board is not exist!');
  } else {
    tasks = tasks.filter(task => !boardTasks.includes(task));
    return tasks;
  }
};

const updateUserInTasks = async (userId: string): Promise<TaskModel[]> => {
  const userTasks = tasks.filter(task => task.userId === userId);
  if (userTasks.length === 0) {
    throw new Error('User is not exist!');
  } else {
    tasks = tasks.map(task => {
      if (userTasks.includes(task)) {
        const newTask = { ...task, userId: null };
        return newTask;
      }
      return task;
    });
    return tasks;
  }
};

export default {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksFromBoard,
  updateUserInTasks,
};
