import tasksRepo from './task.memory.repository';
import { TaskModel } from './task.model';

const getAll = (): Promise<TaskModel[]> => tasksRepo.getAll();

const getTaskById = (id: string): Promise<TaskModel> => tasksRepo.getTaskById(id);

const createTask = (
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<TaskModel> => tasksRepo.createTask(title, order, description, userId, boardId, columnId);

const updateTask = (
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<TaskModel> =>
  tasksRepo.updateTask(id, title, order, description, userId, boardId, columnId);

const deleteTask = (id: string): Promise<void> => tasksRepo.deleteTask(id);

export default { getAll, getTaskById, createTask, updateTask, deleteTask };
