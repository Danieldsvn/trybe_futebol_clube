import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    try {
      const response = await MatchService.getAll();

      const { status, payload } = response;

      return res.status(status).json(payload);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'erro' });
    }
  }
}
