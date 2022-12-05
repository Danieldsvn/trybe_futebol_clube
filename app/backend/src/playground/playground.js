// const matchesMock = require('./route_get_matches_mock.json');

// // Total de pontos

// function totalScore(victories_, draws_) {
//   return (3 * victories_) + draws_;
// }

// // Encontrar quais ids diferentes de homeTeam existe e fazer um array deles
// // eliminando os repetidos

// const homeTeams = matchesMock.map((team_) => team_.homeTeam);
// const homeTeamsUnique = [...new Set(homeTeams)]; // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set

// console.log(`homeTeamsUnique: ${homeTeamsUnique} `);

// // Construindo array de times sem ordem

// const allTeamsObj = [];

// for (let index = 0; index <= homeTeamsUnique.length - 1; index += 1) {
//   const team = matchesMock.filter((match) => match.homeTeam === homeTeamsUnique[index]);

//   const name = team[0].teamHome.teamName;

//   const totalGames = team.length;

//   let victories = 0;
//   let draws = 0;
//   let losses = 0;

//   team.forEach((match) => {
//     if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
//     if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
//     if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
//   });

//   const totalPoints = totalScore(victories, draws);

//   let goalsFavor = 0;
//   let goalsOwn = 0;

//   team.forEach((match) => {
//     goalsFavor += match.homeTeamGoals;
//     goalsOwn += match.awayTeamGoals;
//   });
//   const goalsBalance = goalsFavor - goalsOwn;

//   const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

//   const teamObj = {
//     name,
//     totalPoints,
//     totalGames,
//     victories,
//     draws,
//     losses,
//     goalsFavor,
//     goalsOwn,
//     goalsBalance,
//     efficiency,
//   };

//   allTeamsObj.push(teamObj);
// }

// // console.log('AllTeamsObj');
// // console.log(allTeamsObj);

// // Ordenando allTeamsObj por pontos

// const allTeamsObjOrdered = allTeamsObj.sort((a, b) => {
//   if (a.totalPoints > b.totalPoints) return -1;
//   if (a.totalPoints < b.totalPoints) return 1;
//   return 0;
// });

// // Ordenando por total de vitorias

// const allTeamsObjOrderedVictories = allTeamsObjOrdered.sort((a, b) => {
//   if (a.totalPoints === b.totalPoints) {
//     if (a.victories > b.victories) return -1;
//     if (a.victories < b.victories) return 1;
//     return 0;
//   }
// });

// // console.log('AllTeamsObjOrderedVictories');
// // console.log(allTeamsObjOrderedVictories);

// // Ordenando por Saldo de gols

// const allTeamsObjOrderedVictoriesAndGolsBalance = allTeamsObjOrderedVictories.sort((a, b) => {
//   if (a.totalPoints === b.totalPoints) {
//     if ((a.victories === b.victories) && (a.goalsBalance > b.goalsBalance)) return -1;
//     if ((a.victories === b.victories) && (a.goalsBalance < b.goalsBalance)) return 1;
//   }
//   return 0;
// });

// // console.log('allTeamsObjOrderedVictoriesAndGolsBalance');
// // console.log(allTeamsObjOrderedVictoriesAndGolsBalance);

// // Ordenando por gols a favor

// const allTeamsObjVictorieGolsBalanceFavor = allTeamsObjOrderedVictoriesAndGolsBalance.sort((a, b) => {
//   if ((a.totalPoints === b.totalPoints) && (a.victories === b.victories)) {
//     if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor > b.goalsFavor)) return -1;
//     if ((a.goalsBalance === b.goalsBalance) && (a.goalsFavor < b.goalsFavor)) return 1;
//   }
//   return 0;
// });

// // console.log('allTeamsObjVictorieGolsBalanceFavor');
// // console.log(allTeamsObjVictorieGolsBalanceFavor);

// // Ordenando por gols contra

// const allTeamsObjVictorieGolsBalanceFavorOwn = allTeamsObjVictorieGolsBalanceFavor.sort((a, b) => {
//   if ((a.totalPoints === b.totalPoints) && (a.victories === b.victories) && (a.goalsBalance === b.goalsBalance)) {
//     if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn < b.goalsOwn)) return -1;
//     if ((a.goalsFavor === b.goalsFavor) && (a.goalsOwn > b.goalsOwn)) return 1;
//   }
//   return 0;
// });

// console.log('allTeamsObjVictorieGolsBalanceFavorOwn');
// console.log(allTeamsObjVictorieGolsBalanceFavorOwn);
