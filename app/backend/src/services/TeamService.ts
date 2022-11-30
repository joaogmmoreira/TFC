import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  private teamModel = TeamModel;

  allTeams = async () => {
    const data = await this.teamModel.findAll();
    return data;
  };

  oneTeam = async (id: number) => {
    const data = await this.teamModel.findOne({ where: { id } });

    return data;
  };
}
