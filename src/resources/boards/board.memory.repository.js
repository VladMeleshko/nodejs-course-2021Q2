const Board = require('./board.model');

const boards = [new Board({title: 'ABC', columns: ['a', 'b', 'c']})];

const getAll = async () => boards;

const getBoardById = async (id) => boards.find(board => board.id === id);

const createBoard = async (title, columns) => {
    const newBoard = new Board({title, columns});
    boards.push(newBoard);
    return newBoard;
}

const updateBoard = async (id, title, columns) => {
    const boardPresence = boards.findIndex(board => board.id === id);
    if (boardPresence === -1) {
        throw new Error('Board is not exist!');
    } else {
        boards[boardPresence].title = title;
        boards[boardPresence].columns = columns;
        return boards[boardPresence];
    }
}

const deleteBoard = async (id) => {
    const boardPresence = boards.findIndex(board => board.id === id);
    if (boardPresence === -1) {
        throw new Error('Board is not exist!');
    } else {
        boards.splice(boardPresence, 1);
    }
}

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
