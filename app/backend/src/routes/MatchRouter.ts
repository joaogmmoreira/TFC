import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req, res) => {
  matchController.allMatches(req, res);
});

// teamRouter.get('/:id', (req, res) => {
//   teamController.oneTeam(req, res);
// });

export default matchRouter;
