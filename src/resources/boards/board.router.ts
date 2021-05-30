import { Router } from 'express';
import Board from './board.model';
import boardsService from './board.service';

const router = Router();

router.route('/').get(async (_, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsService.getBoardById(id);
    res.json(Board.toResponse(board));
  } catch {
    res.status(404).send('No such board exist!');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard(title, columns);
    res.status(201).json(Board.toResponse(board));
  } catch {
    res.status(404).send('Board was not created!');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, columns } = req.body;
    const board = await boardsService.updateBoard(id, title, columns);
    res.status(200).json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await boardsService.deleteBoard(id);
    res.status(204).send('Board has been deleted!');
  } catch (e) {
    res.status(404).send(e);
  }
});

export default router;
