import { Router } from 'express';
import usersService from './user.service';
import { toResponse } from './user.memory.repository';

const router = Router();

router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  res.json(users.map(user => toResponse(user)));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.json(toResponse(user));
  } catch {
    res.status(404).send('No such user exist!');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.createUser(name, login, password);
    res.status(201).json(toResponse(user));
  } catch {
    res.status(404).send('User was not created!');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.updateUser(id, name, login, password);
    res.status(200).json(toResponse(user));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(204).send('User has been deleted!');
  } catch (e) {
    res.status(404).send(e);
  }
});

export default router;
