import { Router } from 'express';
import loginRepo from './login.service';

const router = Router();
router.route('/').post(async (req, res) => {
  try {
    const { login, password } = req.body;
    const candidateToken = await loginRepo.autoriseUser(login, password);
    res.status(200).json(candidateToken);
  } catch (e) {
    if (e.message === 'Unauthorized') {
      res.status(401).send(e);
    } else if (e.message === 'Forbidden') {
      res.status(403).send(e);
    }
  }
});

export default router;
