import { Request, Response } from 'express';
import verifyToken from '../auth/verifyToken';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  allMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    // console.log(typeof bool.inProgress);

    if (inProgress) {
      const inProgressBool = inProgress === 'true';
      const data = await this.service.inProgressMatches(inProgressBool);
      return res.status(200).json(data);
    }
    const data = await this.service.allMatches();
    return res.status(200).json(data);
  };

  insertMatch = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    verifyToken(res, authorization);

    const data = req.body;

    const { type, message } = await this.service.insertMatch(data);

    if (!type) {
      return res.status(201).json(message);
    }

    return res.status(type).json({ message });

    // Cannot set headers after they are sent to the client
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { type, message } = await this.service.finishMatch(id);

    if (!type) {
      return res.status(200).json({ message });
    }
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { type, message } = await this.service.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (!type) {
      return res.status(200).json({ message });
    }

    return res.status(400).json({ message: 'Match not updated' });
  };
}
