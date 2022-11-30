import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  allTeams = async (_req: Request, res: Response) => {
    const data = await this.service.allTeams();
    return res.status(200).json(data);
  };

  oneTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.oneTeam(Number(id));

    return res.status(200).json(data);
  };
}
