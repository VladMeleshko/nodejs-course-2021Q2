import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { Boards } from '../../entities/board';
import { Columns } from '../../entities/column';
import { Tasks } from '../../entities/task';

const getAll = (): Promise<Boards[]> => boardsRepo.getAll();

const getBoardById = (id: string): Promise<Boards> => boardsRepo.getBoardById(id);

const createBoard = (title: string, columns: Columns[]): Promise<Boards> =>
  boardsRepo.createBoard(title, columns);

const updateBoard = (id: string, title: string, columns: Columns[]): Promise<Boards> =>
  boardsRepo.updateBoard(id, title, columns);

const deleteBoard = async (
  id: string,
): Promise<[PromiseSettledResult<void>, PromiseSettledResult<Tasks[]>]> =>
  Promise.allSettled([boardsRepo.deleteBoard(id), tasksRepo.deleteTasksFromBoard(id)]);

export default { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
