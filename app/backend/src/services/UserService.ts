import { compareSync } from 'bcryptjs';
import { sign, SignOptions } from 'jsonwebtoken';
import UserModel from '../database/models/UsersModel';

export const secret = 'jwt_secret';

export interface Login {
  message?: string;
  status: number;
  token?: string;
  role?: string;
}

const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';

export default class UserService {
  static async login(email: string, password: string): Promise<Login> {
    const bodyValiddation = this.bodyValidation(email, password);
    if (bodyValiddation) {
      return bodyValiddation;
    }

    const response = await UserModel.findOne({ where: { email } });

    if (!response) {
      return { status: 401, message: INCORRECT_EMAIL_OR_PASSWORD };
    }

    const passwordValidation = this.passwordValidation(password, response.password);
    if (passwordValidation) {
      return passwordValidation;
    }
    const jwtConfig: SignOptions = { expiresIn: '8h', algorithm: 'HS256' };
    const token = sign({ data: email }, secret, jwtConfig);

    return { status: 200, token };
  }

  static async loginValidation(email: string): Promise<Login> {
    const response = await UserModel.findOne({ where: { email } });

    if (!response) {
      return { status: 401, message: INCORRECT_EMAIL_OR_PASSWORD };
    }

    return { status: 200, role: response.role };
  }

  static passwordValidation(bodyPassword: string, dbPassword: string) {
    const validPassword = compareSync(bodyPassword, dbPassword);
    if (!validPassword) {
      return { status: 401, message: INCORRECT_EMAIL_OR_PASSWORD };
    }
  }

  static bodyValidation(email: string, password: string) {
    if (!email || email.length === 0) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (!password || password.length === 0) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (password.length < 7 && password.length > 0) {
      return { status: 401, message: INCORRECT_EMAIL_OR_PASSWORD };
    }
  }
}
