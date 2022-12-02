import { Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import UserService, { secret } from '../services/UserService';

type Token = string;

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

  static async loginValidation(req: Request, res: Response) {
    try {
      const tokenUser = req.headers.authorization;

      const decoded = verify(tokenUser as Token, secret as string) as JwtPayload;

      const response = await UserService.loginValidation(decoded.data);
      const { status, message, role } = response;
      if (role) {
        return res.status(status).json({ role });
      }
      return res.status(status).json({ message });
    } catch (err) {
      return res.status(500).json({ message: 'erro' });
    }
  }
}
