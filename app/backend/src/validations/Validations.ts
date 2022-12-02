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

  static async matchCreate(homeTeam: number, awayTeam: number) {
    const equalTeams = this.equalTeams(homeTeam, awayTeam);
    if (equalTeams) return { status: equalTeams.status, message: equalTeams.message };
    const home = await this.existTeam(homeTeam);
    if (home) return { status: home.status, message: home.message };
    const away = await this.existTeam(awayTeam);
    if (away) return { status: away.status, message: away.message };
    return false;
  }
}
