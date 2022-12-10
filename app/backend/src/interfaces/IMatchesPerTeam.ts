export default interface IMatchesPerTeam {
  teamId: number,
  matches: [
    {
      id: number,
      homeTeam: number,
      homeTeamGoals: number,
      awayTeam: number,
      awayTeamGoals: number,
      inProgress: boolean,
    },
  ]
}
