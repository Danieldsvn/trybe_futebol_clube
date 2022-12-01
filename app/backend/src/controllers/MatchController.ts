import { Request, Response } from 'express';
import Validations from '../validations/Validations';

import createMatch from '../interfaces/CreateMatchInterface';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const response = await MatchService.getByQuery(inProgress as string);
        const { status, payload } = response;
        return res.status(status).json(payload);
      }
      const response = await MatchService.getAll();

      const { status, payload } = response;

      return res.status(status).json(payload);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'erro' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const equalTeams = Validations.equalTeams(homeTeam, awayTeam);
      if (equalTeams) return res.status(equalTeams.status).json({ message: equalTeams.message });
      const home = await Validations.existTeam(homeTeam);
      if (home) return res.status(home.status).json({ message: home.message });
      const away = await Validations.existTeam(awayTeam);
      if (away) return res.status(away.status).json({ message: away.message });

      const newMatch: createMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

      const response = await MatchService.create(newMatch);

      const { status, payload } = response;
      return res.status(status).json(payload);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'erro ' });
    }
  }

  static async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await MatchService.finishMatch(+id);

      const { status, message } = response;

      return res.status(status).json({ message });
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
