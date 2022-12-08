import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  homeTeamsLeaderboard = async (req: Request, res: Response) => {
    const { type, message } = await this.service.homeTeamsLeaderboard();

    if (!type) {
      return res.status(200).json(message);
    }
  };
}
