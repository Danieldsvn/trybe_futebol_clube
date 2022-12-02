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

      const validation = await Validations.matchCreate(homeTeam, awayTeam);
      if (validation) {
        return res.status(validation.status).json({ message: validation.message });
      }

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

  static async editMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const response = await MatchService.editMatch(+id, +homeTeamGoals, +awayTeamGoals);
      const { status, message } = response;

      return res.status(status).json({ message });
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
