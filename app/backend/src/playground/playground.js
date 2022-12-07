const matchesMock = require('./route_get_matches_mock.json');

// Gera array Ids dos times da casa
function homeTeamIdGenerator(matches) {
  const homeTeams = matches.map((team_) => team_.homeTeam);
  const homeTeamsUnique = [...new Set(homeTeams)];
  return homeTeamsUnique;
}

// Calcula pontuação total
function totalScore(victories_, draws_) {
  return (3 * victories_) + draws_;
}

// Gera vitórias, empates, derrotas e pontuação total
function victoryDrawsLosses(matches) {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
  });

  const totalPoints = totalScore(victories, draws);

  return { victories, draws, losses, totalPoints };
}

// Gera gols a favor, contra e saldo de gols
function goalsBalanceFunction(matches) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

// Cria uma unidade do Leaderboard
function createTeamObject(team) {
  const name = team[0].teamHome.teamName;
  const totalGames = team.length;
  const { victories, draws, losses, totalPoints } = victoryDrawsLosses(team);
  const { goalsFavor, goalsOwn, goalsBalance } = goalsBalanceFunction(team);
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return {
    name,
    totalPoints,
    totalGames,
    victories,
    draws,
    losses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}

// Ordena Leaderboard pela pontuação

function orderByPoints(teams) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelas victórias

function orderByVictories(teams) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.victories > b.victories) return -1;
      if (a.victories < b.victories) return 1;
      return 0;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelo saldo de gols

function orderByGoalsBalance(teams) {
  const teamsOrdered = teams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if ((a.victories === b.victories) && (a.goalsBalance > b.goalsBalance)) return -1;
      if ((a.victories === b.victories) && (a.goalsBalance < b.goalsBalance)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordena Leaderboard pelos gols a favor

function orderByGoalsFavor(teams) {
  const teamsOrdered = teams.sort((a, b) => {
    if ((a.totalPoints === b.totalPoints) && (a.victories === b.victories)) {
      if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor > b.goalsFavor)) return -1;
      if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor < b.goalsFavor)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Ordenando Leaderboard pelos gols contra

function orderByGoalsOwn(teams) {
  const teamsOrdered = teams.sort((a, b) => {
    if ((a.totalPoints !== b.totalPoints)) return 0;
    if ((a.victories === b.victories) && (a.goalsBalance === b.goalsBalance)) {
      if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn < b.goalsOwn)) return -1;
      if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn > b.goalsOwn)) return 1;
    }
    return 0;
  });
  return teamsOrdered;
}

// Aplicando todas as ordenações ao Leaderboard

function orderLeaderboard(teams) {
  const orderedPoints = orderByPoints(teams);
  const orderedVictories = orderByVictories(orderedPoints);
  const orderedGoalsBalance = orderByGoalsBalance(orderedVictories);
  const orderedGoalsFavor = orderByGoalsFavor(orderedGoalsBalance);
  const orderedGoalsOwn = orderByGoalsOwn(orderedGoalsFavor);

  return orderedGoalsOwn;
}

function leaderboardGenerator(matches) {
  const leaderboard = [];
  const homeTeamIds = homeTeamIdGenerator(matches);

  for (let index = 0; index <= homeTeamIds.length - 1; index += 1) {
    const team = matches.filter((match) => match.homeTeam === homeTeamIds[index]);
    const teamObject = createTeamObject(team);
    leaderboard.push(teamObject);
  }

  const orderedLeaderboard = orderLeaderboard(leaderboard);
  return orderedLeaderboard;
}
console.log(leaderboardGenerator(matchesMock));
