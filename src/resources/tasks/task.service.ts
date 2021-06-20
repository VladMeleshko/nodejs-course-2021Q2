import tasksRepo from './task.memory.repository';
import { Tasks } from '../../entities/task';

const getAll = (): Promise<Tasks[]> => tasksRepo.getAll();

const getTaskById = (id: string): Promise<Tasks> => tasksRepo.getTaskById(id);

const createTask = (
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<Tasks> => tasksRepo.createTask(title, order, description, userId, boardId, columnId);

const updateTask = (
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<Tasks> => tasksRepo.updateTask(id, title, order, description, userId, boardId, columnId);

const deleteTask = (id: string): Promise<void> => tasksRepo.deleteTask(id);

export default { getAll, getTaskById, createTask, updateTask, deleteTask };
