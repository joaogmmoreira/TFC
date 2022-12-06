import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import IMatch from '../interfaces/IMatch';

export default class MatchService {
  private matchModel = MatchModel;

  allMatches = async () => {
    const data = await this.matchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return data;
  };

  inProgressMatches = async (inProgress: boolean) => {
    const data = await this.allMatches();
    const matches = data.filter((element) => element.inProgress === inProgress);
    return matches;
  };

  insertMatch = async (match: IMatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const result = await this.matchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });

    return { type: null, message: result };
  };

  finishMatch = async (id: string) => {
    const match = await this.matchModel.findOne({ where: { id } });

    await match?.update({ inProgress: false });

    return { type: null, message: 'Finished' };
  };
}
