import { Router } from 'express';
import boardsService from './board.service';
import { toResponse } from './board.memory.repository';

const router = Router();

router.route('/').get(async (_, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(board => toResponse(board)));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsService.getBoardById(id);
    res.json(toResponse(board));
  } catch {
    res.status(404).send('No such board exist!');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard(title, columns);
    res.status(201).json(toResponse(board));
  } catch {
    res.status(404).send('Board was not created!');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, columns } = req.body;
    const board = await boardsService.updateBoard(id, title, columns);
    res.status(200).json(toResponse(board));
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
