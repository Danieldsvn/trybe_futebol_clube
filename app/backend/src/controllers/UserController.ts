import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const response = await UserService.login(email, password);
      if (response.token) return res.status(200).json(response.token);
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
