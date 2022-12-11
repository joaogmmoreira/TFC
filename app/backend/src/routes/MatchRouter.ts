import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import verifyToken from '../auth/verifyToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req, res) => {
  matchController.allMatches(req, res);
});

matchRouter.post('/', (req, res, next) => {
  verifyToken(req, res, next);
}, (req, res) => {
  matchController.insertMatch(req, res);
});

// matchRouter.post('/', (req, res) => {
//   matchController.insertMatch(req, res);
// });

matchRouter.patch('/:id/finish', (req, res) => {
  matchController.finishMatch(req, res);
});

matchRouter.patch('/:id', (req, res) => {
  matchController.updateMatch(req, res);
});

export default matchRouter;
