import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  allMatches = async (_req: Request, res: Response) => {
    const data = await this.service.allMatches();
    return res.status(200).json(data);
  };
}
