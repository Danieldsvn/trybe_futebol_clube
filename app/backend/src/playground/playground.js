const matchesMock = require('./route_get_matches_mock.json');

// console.log(matchesMock);

// array do time de id 1
const team1Matches = matchesMock.filter((match) => match.homeTeam === 12);

// Nome do time

const name = team1Matches[0].teamHome.teamName;

// console.log(`name: ${name}`);

// total de jogos

const totalGames = team1Matches.length;

// console.log(`totalGames: ${totalGames}`);

// Número de vitórias, empates e derrotas time id 1

let victories = 0;
let draws = 0;
let losses = 0;

team1Matches.forEach((match) => {
  if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
  if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
  if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
});

// console.log(`victories: ${victories}`);
// console.log(`draws: ${draws}`);
// console.log(`losses: ${losses}`);

// Total de pontos

function totalScore(victories_, draws_) {
  return (3 * victories_) + draws_;
}

const totalPoints = totalScore(victories, draws);

// console.log(`Total de pontos: ${totalPoints}`);

// Gols a favor/ Own/ Goals Balance

let goalsFavor = 0;
let goalsOwn = 0;

team1Matches.forEach((match) => {
  goalsFavor += match.homeTeamGoals;
  goalsOwn += match.awayTeamGoals;
});

const goalsBalance = goalsFavor - goalsOwn;
// console.log(`goalsFavor: ${goalsFavor}`);
// console.log(`goalsOwn: ${goalsOwn}`);
// console.log(`goalsBalance: ${goalsBalance}`);

//  Efficiency

const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

// console.log(`efficiency: ${efficiency}`);

// Objeto com todas as informações de um time:
console.log('Objeto com todas as informações de um time:');
const team = {
  name,
  totalGames,
  victories,
  draws,
  losses,
  totalPoints,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
};

console.log(team);
console.log('----------------------------');
// Encontrar quais ids diferentes de homeTeam existe e fazer um array deles
// eliminando os repetidos

const homeTeams = matchesMock.map((team_) => team_.homeTeam);
const homeTeamsUnique = [...new Set(homeTeams)];

console.log(`homeTeamsUnique: ${homeTeamsUnique} `);

// Construindo array de times sem ordem

const allTeamsObj = [];

for (let index = 0; index <= homeTeamsUnique.length - 1; index += 1) {
  const team_ = matchesMock.filter((match) => match.homeTeam === homeTeamsUnique[index]);

  const name_ = team_[0].teamHome.teamName;

  const totalGames_ = team_.length;

  let victories_ = 0;
  let draws_ = 0;
  let losses_ = 0;

  team_.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) victories_ += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) draws_ += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) losses_ += 1;
  });

  const totalPoints_ = totalScore(victories_, draws_);

  let goalsFavor_ = 0;
  let goalsOwn_ = 0;

  team_.forEach((match) => {
    goalsFavor_ += match.homeTeamGoals;
    goalsOwn_ += match.awayTeamGoals;
  });
  const goalsBalance_ = goalsFavor - goalsOwn;

  const efficiency_ = ((totalPoints_ / (totalGames_ * 3)) * 100).toFixed(2);

  const teamObj = {
    name_,
    totalGames_,
    victories_,
    draws_,
    losses_,
    totalPoints_,
    goalsFavor_,
    goalsOwn_,
    goalsBalance_,
    efficiency_,
  };

  allTeamsObj.push(teamObj);
}

console.log('AllTeamsObj');
console.log(allTeamsObj);
