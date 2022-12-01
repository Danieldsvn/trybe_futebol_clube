import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import createMatch from '../interfaces/CreateMatchInterface';

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

  static async create(newMatch: createMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    if (homeTeam === awayTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const response = await MatchModel.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    return { status: 201, payload: response };
  }

  static async finishMatch(id: number) {
    const response = await MatchModel.update({ inProgress: false }, {
      where: { id },
    });

    console.log(response);

    return { status: 200, message: 'Finished' };
  }
}
