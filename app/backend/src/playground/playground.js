const matchesMock = require('./route_get_matches_mock.json');

// Total de pontos

function totalScore(victories_, draws_) {
  return (3 * victories_) + draws_;
}

// Encontrar quais ids diferentes de homeTeam existe e fazer um array deles
// eliminando os repetidos

const homeTeams = matchesMock.map((team_) => team_.homeTeam);
const homeTeamsUnique = [...new Set(homeTeams)]; // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set

console.log(`homeTeamsUnique: ${homeTeamsUnique} `);

// Construindo array de times sem ordem

const allTeamsObj = [];

for (let index = 0; index <= homeTeamsUnique.length - 1; index += 1) {
  const team = matchesMock.filter((match) => match.homeTeam === homeTeamsUnique[index]);

  const name = team[0].teamHome.teamName;

  const totalGames = team.length;

  let victories = 0;
  let draws = 0;
  let losses = 0;

  team.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
  });

  const totalPoints = totalScore(victories, draws);

  let goalsFavor = 0;
  let goalsOwn = 0;

  team.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });
  const goalsBalance = goalsFavor - goalsOwn;

  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

  const teamObj = {
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

  allTeamsObj.push(teamObj);
}

console.log('AllTeamsObj');
console.log(allTeamsObj);

// Ordenando allTeamsObj
