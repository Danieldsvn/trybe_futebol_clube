import GetMatches from '../interfaces/GetMatchesInterface';
import Matches from '../database/models/MatchesModel';
import MatchService from '../services/MatchService';

function totalScore(victories_: number, draws_: number) {
  return (3 * victories_) + draws_;
}

function homeTeamIdGenerator(matches: Matches[]) {
  const homeTeams = matches.map((team_) => team_.homeTeam);
  const homeTeamsUnique = [...new Set(homeTeams)];
  return homeTeamsUnique;
}

function victoryDrawsLosses(matches: GetMatches[]) {
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

function goalsBalanceFunction(matches: GetMatches[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
}

function homeTeamGenerator(matches: GetMatches[], homeTeamIds: number[]) {
  const allTeamsObj = [];

  for (let index = 0; index <= homeTeamIds.length - 1; index += 1) {
    const team = matches.filter((match) => match.homeTeam === homeTeamIds[index]);

    const name = team[0].teamHome.teamName;

    const totalGames = team.length;

    const { victories, draws, losses, totalPoints } = victoryDrawsLosses(team);
    const { goalsFavor, goalsOwn, goalsBalance } = goalsBalanceFunction(team);

    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    allTeamsObj.push({
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
    });

    return allTeamsObj;
  }
}
async function matchesGenerator() {
  const matches = await MatchService.getAllFinishedMatches();

  const homeTeamIds = homeTeamIdGenerator(matches);

  const leaderboard = homeTeamGenerator(matches, homeTeamIds);
}

// Total de pontos

// Ordenando allTeamsObj por pontos

const allTeamsObjOrdered = allTeamsObj.sort((a, b) => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  return 0;
});

// Ordenando por total de vitorias

const allTeamsObjOrderedVictories = allTeamsObjOrdered.sort((a, b) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.victories > b.victories) return -1;
    if (a.victories < b.victories) return 1;
    return 0;
  }
});

// console.log('AllTeamsObjOrderedVictories');
// console.log(allTeamsObjOrderedVictories);

// Ordenando por Saldo de gols

const allTeamsObjOrderedVictoriesAndGolsBalance = allTeamsObjOrderedVictories.sort((a, b) => {
  if (a.totalPoints === b.totalPoints) {
    if ((a.victories === b.victories) && (a.goalsBalance > b.goalsBalance)) return -1;
    if ((a.victories === b.victories) && (a.goalsBalance < b.goalsBalance)) return 1;
  }
  return 0;
});

// console.log('allTeamsObjOrderedVictoriesAndGolsBalance');
// console.log(allTeamsObjOrderedVictoriesAndGolsBalance);

// Ordenando por gols a favor

const allTeamsObjVictorieGolsBalanceFavor = allTeamsObjOrderedVictoriesAndGolsBalance.sort((a, b) => {
  if ((a.totalPoints === b.totalPoints) && (a.victories === b.victories)) {
    if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor > b.goalsFavor)) return -1;
    if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor < b.goalsFavor)) return 1;
  }
  return 0;
});

// console.log('allTeamsObjVictorieGolsBalanceFavor');
// console.log(allTeamsObjVictorieGolsBalanceFavor);

// Ordenando por gols contra

const allTeamsObjVictorieGolsBalanceFavorOwn = allTeamsObjVictorieGolsBalanceFavor.sort((a, b) => {
  if ((a.totalPoints === b.totalPoints) && (a.victories === b.victories) && (a.goalsBalance === b.goalsBalance)) {
    if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn < b.goalsOwn)) return -1;
    if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn > b.goalsOwn)) return 1;
  }
  return 0;
});

console.log('allTeamsObjVictorieGolsBalanceFavorOwn');
console.log(allTeamsObjVictorieGolsBalanceFavorOwn);
