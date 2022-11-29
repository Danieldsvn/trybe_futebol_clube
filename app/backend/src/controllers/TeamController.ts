import { Request, Response } from 'express';

import TeamService from '../services/TeamService';

export default class TeamController {
  static async getAll(req: Request, res: Response) {
    try {
      const response = await TeamService.getAll();
      const { status, payload } = response;
      return res.status(status).json(payload);
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await TeamService.getById(+id);
      const { status, payload } = response;
      return res.status(status).json(payload);
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
