import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (req, res) => {
  teamController.allTeams(req, res);
});

teamRouter.get('/:id', (req, res) => {
  teamController.oneTeam(req, res);
});

export default teamRouter;
