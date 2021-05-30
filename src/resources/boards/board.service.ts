import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { BoardModel, ColumnsModel } from './board.model';

const getAll = (): Promise<BoardModel[]> => boardsRepo.getAll();

const getBoardById = (id: string): Promise<BoardModel> => boardsRepo.getBoardById(id);

const createBoard = (title: string, columns: ColumnsModel[]): Promise<BoardModel> =>
  boardsRepo.createBoard(title, columns);

const updateBoard = (id: string, title: string, columns: ColumnsModel[]): Promise<BoardModel> =>
  boardsRepo.updateBoard(id, title, columns);

const deleteBoard = (id: string): void => {
  boardsRepo.deleteBoard(id);
  tasksRepo.deleteTasksFromBoard(id);
};

export default { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
