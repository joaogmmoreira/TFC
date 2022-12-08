import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  private matchModel = MatchModel;
  private teamModel = TeamModel;

  homeTeamsLeaderboard = async () => {
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

    const matches = data.filter((element) => element.inProgress === false);

    return { type: null, message: matches };
  };
}
