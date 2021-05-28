const {v4: uuid} = require('uuid');

/**
 * @typedef {Object} ColumnsModel columns information.
 * @property {string} id columns id.
 * @property {string} title columns title.
 * @property {number} order columns order.
 */

/**
 * @typedef {Object} BoardInfo board's information.
 * @property {string} title board title.
 * @property {Array.<ColumnsModel>} columns board columns.
 */

/**
 * @typedef {BoardInfo & {id: string}} BoardModel contains board's information and board's id.
 */

/** Class representing a board. */
class Board {
  /**
   * Create a board.
   * @param {BoardInfo} newBoard parameters of new board.
   * @returns {BoardModel} new board.
   */
    constructor({
      id = uuid(),
      title = 'TITLE',
      columns = [],
    } = {}) {
      this.id = id;
      this.title = title;
      this.columns = columns;
    }

    /**
     * Processes board information from the server.
     * @param {BoardModel} board board's information from server.
     * @returns {BoardModel} return processed board information.
     */  
    static toResponse(board) {
      const { id, title, columns } = board;
      return { id, title, columns };
    }
  }

module.exports = Board;