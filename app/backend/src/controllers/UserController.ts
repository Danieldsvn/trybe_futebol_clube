import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService,
  ) {}
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await this.userService(email, password);
    if(response.token) return res.status(200).json(token: response.token)
  }
}