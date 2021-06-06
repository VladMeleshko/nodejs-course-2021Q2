import { v4 as uuid } from 'uuid';

export interface ColumnsModel {
  id: string;
  title: string;
  order: number;
}

export interface BoardInfo {
  title: string;
  columns: ColumnsModel[];
}

export interface BoardModel extends BoardInfo {
  id: string;
}

class Board {
  id: BoardModel['id'];

  title: BoardModel['title'];

  columns: BoardModel['columns'];

  constructor({ title = 'TITLE', columns = [] }: BoardInfo) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: BoardModel): BoardModel {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
