import matchesMock from './route_get_matches_mock.json';

// console.log(matchesMock);

// array do time de id 1
const team1Matches = matchesMock.filter((match) => match.homeTeam === 1);

console.log(team1Matches);
