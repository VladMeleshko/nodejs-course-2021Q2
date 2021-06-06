import { v4 as uuid } from 'uuid';

export interface TaskInfo {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export interface TaskModel extends TaskInfo {
  id: string;
}

class Task {
  id: TaskModel['id'];

  title: TaskModel['title'];

  order: TaskModel['order'];

  description: TaskModel['description'];

  userId: TaskModel['userId'];

  boardId: TaskModel['boardId'];

  columnId: TaskModel['columnId'];

  constructor({
    title = 'TITLE',
    order = 0,
    description = 'DESCRIPTION',
    userId = null,
    boardId,
    columnId,
  }: TaskInfo) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: TaskModel): TaskModel {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
