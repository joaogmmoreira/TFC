import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  homeTeamsLeaderboard = async (req: Request, res: Response) => {
    const { url } = req;

    if (url === '/home') {
      const { type, message } = await this.service.teamsLeaderboard('home');
      if (!type) {
        return res.status(200).json(message);
      }
      return res.status(type).json({ message });
    }

    const { type, message } = await this.service.teamsLeaderboard('away');

    if (!type) {
      return res.status(200).json(message);
    }
    return res.status(type).json({ message });
  };
}
