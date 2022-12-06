import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req, res) => {
  matchController.allMatches(req, res);
});

matchRouter.post('/', (req, res) => {
  matchController.insertMatch(req, res);
});

matchRouter.patch('/:id/finish', (req, res) => {
  matchController.finishMatch(req, res);
});

export default matchRouter;
