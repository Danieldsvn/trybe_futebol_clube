import MatchModel from '../database/models/MatchesModel';

export default class MatchService {
  static async getAll() {
    const response = await MatchModel.findAll();

    return { status: 200, payload: response };
  }

  // static async getById()
}
