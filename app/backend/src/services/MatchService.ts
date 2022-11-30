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
}
