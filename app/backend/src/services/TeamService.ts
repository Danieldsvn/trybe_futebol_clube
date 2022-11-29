import TeamModel from '../database/models/TeamsModel';

export default class TeamService {
  static async getAll() {
    const response = await TeamModel.findAll();

    return { status: 200, payload: response };
  }

  static async getById(id: number) {
    const response = await TeamModel.findOne({ where: { id } });

    return { status: 200, payload: response };
  }
}
