import { Router } from 'express';
import Task from './task.model';
import tasksService from './task.service';

const router = Router({ mergeParams: true });

router.route('/:boardId/tasks/').get(async (_, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasksService.getTaskById(id);
    res.json(Task.toResponse(task));
  } catch {
    res.status(404).send('No such task exist!');
  }
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.createTask(
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    );
    res.status(201).json(Task.toResponse(task));
  } catch {
    res.status(404).send('Task was not created!');
  }
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  try {
    const { boardId, id } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.updateTask(
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    );
    res.status(200).json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await tasksService.deleteTask(id);
    res.status(204).send('Task has been deleted!');
  } catch (e) {
    res.status(404).send(e);
  }
});

export default router;
