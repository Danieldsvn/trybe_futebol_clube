import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secret } from '../services/UserService';

export default async function TokenValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenUser = req.headers.authorization;
    try {
      verify(tokenUser as string, secret as string);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'erro' });
  }
}
