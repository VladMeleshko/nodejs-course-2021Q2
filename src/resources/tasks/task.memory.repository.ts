import { Tasks } from '../../entities/task';
import { tryDBConnect } from '../../helpers/db';

const taskRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Tasks));

const getAll = async (): Promise<Tasks[]> => {
  const taskRepository = await taskRepositoryPromise;
  const tasks = await taskRepository.find();
  return tasks;
};

const getTaskById = async (id: string): Promise<Tasks> => {
  const taskRepository = await taskRepositoryPromise;
  const task = await taskRepository.findOneOrFail(id);
  return task;
};

const createTask = async (
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<Tasks> => {
  const taskRepository = await taskRepositoryPromise;
  const task = await taskRepository.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  await taskRepository.save(task);
  return task;
};

const updateTask = async (
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
): Promise<Tasks> => {
  const taskRepository = await taskRepositoryPromise;
  const task = await taskRepository.findOneOrFail(id);
  await taskRepository.update(id, { title, order, description, userId, boardId, columnId });
  return task;
};

const deleteTask = async (id: string): Promise<void> => {
  const taskRepository = await taskRepositoryPromise;
  await taskRepository.findOneOrFail(id);
  await taskRepository.delete(id);
};

const deleteTasksFromBoard = async (boardId: string): Promise<Tasks[]> => {
  const taskRepository = await taskRepositoryPromise;
  await taskRepository.findOneOrFail({ boardId });
  await taskRepository.delete({ boardId });
  const tasks = await taskRepository.find();
  return tasks;
};

const updateUserInTasks = async (userId: string): Promise<Tasks[]> => {
  const taskRepository = await taskRepositoryPromise;
  await taskRepository.findOneOrFail({ userId });
  await taskRepository.update({ userId }, { userId: undefined });
  const tasks = await taskRepository.find();
  return tasks;
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
