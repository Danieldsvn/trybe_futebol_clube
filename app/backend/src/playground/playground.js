const matchesMock = require('./route_get_matches_mock.json');

// console.log(matchesMock);

// array do time de id 1
const team1Matches = matchesMock.filter((match) => match.homeTeam === 12);

// Nome do time

const name = team1Matches[0].teamHome.teamName;

console.log(`name: ${name}`);

// total de jogos

const totalGames = team1Matches.length;

console.log(`totalGames: ${totalGames}`);

// Número de vitórias, empates e derrotas time id 1

let victories = 0;
let draws = 0;
let losses = 0;

team1Matches.forEach((match) => {
  if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
  if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
  if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
});

console.log(`victories: ${victories}`);
console.log(`draws: ${draws}`);
console.log(`losses: ${losses}`);

// Total de pontos

function totalScore(victories_, draws_) {
  return (3 * victories_) + draws_;
}

const totalPoints = totalScore(victories, draws);

console.log(`Total de pontos: ${totalPoints}`);

// Gols a favor/ Own/ Goals Balance

let goalsFavor = 0;
let goalsOwn = 0;

team1Matches.forEach((match) => {
  goalsFavor += match.homeTeamGoals;
  goalsOwn += match.awayTeamGoals;
});

const goalsBalance = goalsFavor - goalsOwn;
console.log(`goalsFavor: ${goalsFavor}`);
console.log(`goalsOwn: ${goalsOwn}`);
console.log(`goalsBalance: ${goalsBalance}`);

//  Efficiency

const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

console.log(`efficiency: ${efficiency}`);
