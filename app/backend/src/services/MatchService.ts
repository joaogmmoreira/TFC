import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

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
}
