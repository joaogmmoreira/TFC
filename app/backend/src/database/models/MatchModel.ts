import { DataTypes, Model } from 'sequelize';
import TeamModel from './TeamModel';
import db from '.';

export default class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals:number;
  declare awayTeam: number;
  declare awayTeamgoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
