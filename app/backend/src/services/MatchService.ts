import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

export default class MatchService {
  static async getAll() {
    const response = await MatchModel.findAll({
      include: [{
        model: TeamModel,
      }, {
        model: TeamModel,
      },
      ],
    });

    return { status: 200, payload: response };
  }

  // static async getById()
}
