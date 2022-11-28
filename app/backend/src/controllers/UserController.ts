import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const response = await UserService.login(email, password);
      const { status, message, token } = response;
      if (token) {
        return res.status(status).json({ token });
      }
      return res.status(status).json({ message });
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
