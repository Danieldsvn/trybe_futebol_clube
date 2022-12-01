import TeamModel from '../database/models/TeamsModel';

export default class Validations {
  static equalTeams(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    return false;
  }

  static async existTeam(team: number) {
    const response = await TeamModel.findOne({ where: { id: team } });
    if (!response) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    return false;
  }
}
