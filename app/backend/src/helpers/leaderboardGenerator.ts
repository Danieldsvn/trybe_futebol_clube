import Leaderboard from '../interfaces/LeaderboardInterface';
import GetMatches from '../interfaces/GetMatchesInterface';

// Gera array Ids dos times da casa
function homeTeamIdGenerator(matches: GetMatches[]) {
  const homeTeams = matches.map((team_) => team_.homeTeam);
  const homeTeamsUnique = [...new Set(homeTeams)];
  return homeTeamsUnique;
}

// Gera array Ids dos times da visitantes
function awayTeamIdGenerator(matches: GetMatches[]) {
  const awayTeams = matches.map((team_) => team_.awayTeam);
  const awayTeamsUnique = [...new Set(awayTeams)];
  return awayTeamsUnique;
}

// Calcula pontuação total
function totalScore(victories_: number, draws_: number) {
  return (3 * victories_) + draws_;
}

// Gera vitórias, empates, derrotas e pontuação total Home
function victoryDrawsLossesHome(matches: GetMatches[]) {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
  });

  const totalPoints = totalScore(totalVictories, totalDraws);

  return { totalVictories, totalDraws, totalLosses, totalPoints };
}

// Gera vitórias, empates, derrotas e pontuação total Away
function victoryDrawsLossesAway(matches: GetMatches[]) {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
    if (match.homeTeamGoals > match.awayTeamGoals) totalLosses += 1;
  });

  const totalPoints = totalScore(totalVictories, totalDraws);

  return { totalVictories, totalDraws, totalLosses, totalPoints };
}

// Gera gols a favor, contra e saldo de gols Home
function goalsBalanceHomeFunction(matches: GetMatches[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

// Gera gols a favor, contra e saldo de gols Away
function goalsBalanceAwayFunction(matches: GetMatches[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

// Cria uma unidade de Home Leaderboard
function createHomeTeamObject(team: GetMatches[]) {
  const name = team[0].teamHome.teamName;
  const totalGames = team.length;
  const { totalVictories, totalDraws, totalLosses, totalPoints } = victoryDrawsLossesHome(team);
  const { goalsFavor, goalsOwn, goalsBalance } = goalsBalanceHomeFunction(team);
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return {
    name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}

// Cria uma unidade de Away Leaderboard
function createAwayTeamObject(team: GetMatches[]) {
  const name = team[0].teamAway.teamName;
  const totalGames = team.length;
  const { totalVictories, totalDraws, totalLosses, totalPoints } = victoryDrawsLossesAway(team);
  const { goalsFavor, goalsOwn, goalsBalance } = goalsBalanceAwayFunction(team);
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return {
    name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}

// Ordena Leaderboard pela pontuação

function orderByPoints(teams: Leaderboard[]) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelas victórias

function orderByVictories(teams: Leaderboard[]) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      return 0;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelo saldo de gols

function orderByGoalsBalance(teams: Leaderboard[]) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if ((a.totalVictories === b.totalVictories) && (a.goalsBalance > b.goalsBalance)) return -1;
      if ((a.totalVictories === b.totalVictories) && (a.goalsBalance < b.goalsBalance)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelos gols a favor

function orderByGoalsFavor(teams: Leaderboard[]) {
  const teamsOrdered = teams.sort((a, b) => {
    if ((a.totalPoints === b.totalPoints) && (a.totalVictories === b.totalVictories)) {
      if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor > b.goalsFavor)) return -1;
      if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor < b.goalsFavor)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordenando Leaderboard pelos gols contra

function orderByGoalsOwn(teams: Leaderboard[]) {
  const teamsOrdered = teams.sort((a, b) => {
    if ((a.totalPoints !== b.totalPoints)) return 0;
    if ((a.totalVictories === b.totalVictories) && (a.goalsBalance === b.goalsBalance)) {
      if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn < b.goalsOwn)) return -1;
      if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn > b.goalsOwn)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Aplicando todas as ordenações ao Leaderboard

function orderLeaderboard(teams: Leaderboard[]) {
  const orderedPoints = orderByPoints(teams);
  const orderedVictories = orderByVictories(orderedPoints);
  const orderedGoalsBalance = orderByGoalsBalance(orderedVictories);
  const orderedGoalsFavor = orderByGoalsFavor(orderedGoalsBalance);
  const orderedGoalsOwn = orderByGoalsOwn(orderedGoalsFavor);

  return orderedGoalsOwn;
}

export function leaderboardHomeGenerator(matches: GetMatches[]) {
  const leaderboard = [];
  const homeTeamIds = homeTeamIdGenerator(matches);

  for (let index = 0; index <= homeTeamIds.length - 1; index += 1) {
    const team = matches.filter((match) => match.homeTeam === homeTeamIds[index]);
    const teamObject = createHomeTeamObject(team);
    leaderboard.push(teamObject);
  }

  const orderedLeaderboard = orderLeaderboard(leaderboard);
  return orderedLeaderboard;
}

export function leaderboardAwayGenerator(matches: GetMatches[]) {
  const leaderboard = [];
  const awayTeamIds = awayTeamIdGenerator(matches);

  for (let index = 0; index <= awayTeamIds.length - 1; index += 1) {
    const team = matches.filter((match) => match.awayTeam === awayTeamIds[index]);
    const teamObject = createAwayTeamObject(team);
    leaderboard.push(teamObject);
  }

  const orderedLeaderboard = orderLeaderboard(leaderboard);
  return orderedLeaderboard;
}
