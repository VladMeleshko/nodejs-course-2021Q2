import { Router } from 'express';
import User from './user.model';
import usersService from './user.service';

const router = Router();

router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.json(User.toResponse(user));
  } catch {
    res.status(404).send('No such user exist!');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.createUser(name, login, password);
    res.status(201).json(User.toResponse(user));
  } catch {
    res.status(404).send('User was not created!');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.updateUser(id, name, login, password);
    res.status(200).json(User.toResponse(user));
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