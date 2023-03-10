type teamHome = {
  teamName: string
};

type teamAway = {
  teamName: string
};

export default interface GetMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: teamHome;
  teamAway: teamAway;
}
