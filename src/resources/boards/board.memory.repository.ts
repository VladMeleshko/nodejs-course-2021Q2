import { Boards } from '../../entities/board';
import { Columns } from '../../entities/column';
import { tryDBConnect } from '../../helpers/db';

const boardRepositoryPromise = tryDBConnect().then(connection => connection.getRepository(Boards));

const getAll = async (): Promise<Boards[]> => {
  const boardRepository = await boardRepositoryPromise;
  const boards = await boardRepository.find();
  return boards;
};

const getBoardById = async (id: string): Promise<Boards> => {
  const boardRepository = await boardRepositoryPromise;
  const board = await boardRepository.findOneOrFail(id);
  return board;
};

const createBoard = async (title: string, columns: Columns[]): Promise<Boards> => {
  const boardRepository = await boardRepositoryPromise;
  const board = await boardRepository.create({ title, columns });
  await boardRepository.save(board);
  return board;
};

const updateBoard = async (id: string, title: string, columns: Columns[]): Promise<Boards> => {
  const boardRepository = await boardRepositoryPromise;
  const board = await boardRepository.findOneOrFail(id);
  await boardRepository.update(id, { title, columns });
  return board;
};

const deleteBoard = async (id: string): Promise<void> => {
  const boardRepository = await boardRepositoryPromise;
  await boardRepository.findOneOrFail(id);
  await boardRepository.delete(id);
};

export const toResponse = (board: Boards): Boards => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

export default { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
