import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  private matchModel = MatchModel;
  private teamModel = TeamModel;

  totalPoints = (matchesPerTeam: any) => {
    const points = matchesPerTeam.map((element: any) => {
      const pointsArr = element.matches.map((element2: any) => {
        if (element2.homeTeamGoals > element2.awayTeamGoals) {
          return 3;
        }
        if (element2.homeTeamGoals < element2.awayTeamGoals) {
          return 0;
        }
        return 1;
      });
      return pointsArr;
    });
    return points;
  };

  matchesPerTeam = (teams: any, matches: any, homeOrAway: string) => {
    const result = teams.map((team: any) => {
      const teamId = team.dataValues.id;
      const { teamName } = team.dataValues;
      if (homeOrAway === 'home') {
        const obj = { teamId,
          teamName,
          matches: matches.filter((element: any) => element
            .dataValues.homeTeam === team.dataValues.id) };
        return obj;
      }
      const obj = { teamId,
        teamName,
        matches: matches.filter((element: any) => element
          .dataValues.awayTeam === team.dataValues.id) };
      return obj;
    });
    return result;
  };

  teamsResults = (matchesPerTeam: any, homeOrAway: string) => {
    const result = matchesPerTeam.map((element: any) => {
      const resultArr = element.matches.map((element2: any) => {
        if (element2.homeTeamGoals > element2.awayTeamGoals && homeOrAway === 'home') return 'win';
        if (element2.homeTeamGoals < element2.awayTeamGoals && homeOrAway === 'home') return 'loss';
        if (element2.homeTeamGoals > element2.awayTeamGoals && homeOrAway === 'away') return 'loss';
        if (element2.homeTeamGoals < element2.awayTeamGoals && homeOrAway === 'away') return 'win';
        return 'draw';
      });
      return resultArr;
    });
    return result;
  };

  totalResults = (teamsResults: any, index: number) => {
    const resultsObj = {
      wins: 0,
      draws: 0,
      losses: 0,
    };
    teamsResults[index].forEach((element: any) => {
      if (element === 'win') resultsObj.wins += 1;

      if (element === 'draw') resultsObj.draws += 1;

      if (element === 'loss') resultsObj.losses += 1;
    });
    return resultsObj;
  };

  totalGoals = (matchesPerTeam: any, index: number) => {
    const goalsObj = {
      goalsFavor: 0,
      goalsOwn: 0,
    };
    matchesPerTeam[index].matches.forEach((element2: any) => {
      if (element2.homeTeamGoals > 0) {
        goalsObj.goalsFavor += element2.homeTeamGoals;
      }
      if (element2.awayTeamGoals > 0) {
        goalsObj.goalsOwn += element2.awayTeamGoals;
      }
    });
    return goalsObj;
  };

  efficiency = (points: any, matches: number, index: number) => {
    const app = ((points[index] / (matches * 3)) * 100).toFixed(2);

    return app;
  };

  leaderboard = (matchesPerTeam: any, teamsResults: any, pointsSum: any) => {
    const leaderboardObj = matchesPerTeam.map((element: any, index: number) => {
      const totalResults = this.totalResults(teamsResults, index);
      const totalGoals = this.totalGoals(matchesPerTeam, index);
      const efficiency = this.efficiency(pointsSum, element.matches.length, index);

      const leaderboardArr = {
        name: element.teamName,
        totalPoints: pointsSum[index],
        totalGames: element.matches.length,
        totalVictories: totalResults.wins,
        totalDraws: totalResults.draws,
        totalLosses: totalResults.losses,
        goalsFavor: totalGoals.goalsFavor,
        goalsOwn: totalGoals.goalsOwn,
        goalsBalance: totalGoals.goalsFavor - totalGoals.goalsOwn,
        efficiency };
      return leaderboardArr;
    });
    return leaderboardObj;
  };

  sortLeaderboard = (leaderboard: any) => {
    const orderedLeaderboard = leaderboard.sort((a: any, b: any) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return orderedLeaderboard;
  };

  teamsLeaderboard = async (homeOrAway: string) => {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teams = await this.teamModel.findAll();

    const matchesPerTeam = this.matchesPerTeam(teams, matches, homeOrAway);

    const teamsResults = this.teamsResults(matchesPerTeam, homeOrAway);

    const points = this.totalPoints(matchesPerTeam);

    const pointsSum = points.map((element:any) => element
      .reduce((acc: number, val: number) => acc + val, 0));

    const leaderboard = this.leaderboard(matchesPerTeam, teamsResults, pointsSum);

    const sortLeaderboard = this.sortLeaderboard(leaderboard);

    return { type: null, message: sortLeaderboard };
  };
}
