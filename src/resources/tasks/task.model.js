const {v4: uuid} = require('uuid');

/**
 * @typedef {Object} TaskInfo task's information.
 * @property {string} title task title
 * @property {number} order task order
 * @property {string} description task description
 * @property {string|null} userId task userId
 * @property {string} boardId task boardId
 * @property {string} columnId task columnId
 */

/**
 * @typedef {TaskInfo & {id: string}} TaskModel contains task's information and task's id.
 */

/** Class representing a task. */
class Task {
    /**
     * Create a task.
     * @param {TaskInfo} newTask parameters of new task.
     * @returns {TaskModel} new task.
     */
    constructor({
      id = uuid(),
      title = 'TITLE',
      order = 0,
      description = 'DESCRIPTION',
      userId = null,
      boardId = null,
      columnId = null,
    } = {}) {
      this.id = id;
      this.title = title;
      this.order = order;
      this.description = description;
      this.userId = userId;
      this.boardId = boardId;
      this.columnId = columnId;
    }
  
    /**
     * Processes task information from the server.
     * @param {TaskModel} task task's information from server.
     * @returns {TaskModel} return processed information about task.
     */
    static toResponse(task) {
      const { id, title, order, description, userId, boardId, columnId } = task;
      return { id, title, order, description, userId, boardId, columnId };
    }
  }

module.exports = Task;