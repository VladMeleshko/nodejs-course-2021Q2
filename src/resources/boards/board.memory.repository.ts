import Board, { BoardModel, ColumnsModel } from './board.model';

const boards: BoardModel[] = [];

const getAll = async (): Promise<BoardModel[]> => boards;

const getBoardById = async (id: string): Promise<BoardModel> => {
  const board = boards.find(boardItem => boardItem.id === id);
  if (!board) {
    throw new Error('Board is not exist!');
  } else {
    return board;
  }
};

const createBoard = async (title: string, columns: ColumnsModel[]): Promise<BoardModel> => {
  const newBoard = new Board({ title, columns });
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (
  id: string,
  title: string,
  columns: ColumnsModel[],
): Promise<BoardModel> => {
  const boardPresence = boards.findIndex(board => board.id === id);
  const board = boards[boardPresence];
  if (!board) {
    throw new Error('Board is not exist!');
  } else {
    const newBoard = { ...board, title, columns };
    boards.splice(boardPresence, 1, newBoard);
    return newBoard;
  }
};

const deleteBoard = async (id: string): Promise<void> => {
  const boardPresence = boards.findIndex(board => board.id === id);
  if (boardPresence === -1) {
    throw new Error('Board is not exist!');
  } else {
    boards.splice(boardPresence, 1);
  }
};

export default { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
