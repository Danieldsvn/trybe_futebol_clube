import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

export default class MatchService {
  static async getAll() {
    const response = await MatchModel.findAll({
      include: [{
        model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
      }, {
        model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
      },
      ],
    });

    return { status: 200, payload: response };
  }

  static async getByQuery(inProgress: string) {
    let boolean = null;
    if (inProgress === 'false') boolean = false;
    if (inProgress === 'true') boolean = true;
    const response = await MatchModel.findAll({
      include: [{
        model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
      }, {
        model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
      },
      ],
      where: { inProgress: boolean },
    });

    return { status: 200, payload: response };
  }
}
