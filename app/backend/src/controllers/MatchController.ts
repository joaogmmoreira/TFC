import { Request, Response } from 'express';
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
}
