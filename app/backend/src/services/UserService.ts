import { compareSync } from 'bcryptjs';
import { sign, SignOptions } from 'jsonwebtoken';
import UserModel from '../database/models/UsersModel';

const secret = 'jwt_secret';

interface Login {
  message?: string;
  status: number;
  token?: string;
}

export default class UserService {
  static async login(email: string, password: string): Promise<Login> {
    const bodyValiddation = this.bodyValidation(email, password);
    if (bodyValiddation) {
      return bodyValiddation;
    }

    const response = await UserModel.findOne({ where: { email } });

    if (!response) {
      return { status: 404, message: 'Usuário não encontrado' };
    }

    const passwordValidation = this.passwordValidation(password, response.password);
    if (passwordValidation) {
      return passwordValidation;
    }
    const jwtConfig: SignOptions = { expiresIn: '8h', algorithm: 'HS256' };
    const token = sign({ data: { email } }, secret, jwtConfig);

    return { status: 200, token };
  }

  static passwordValidation(bodyPassword: string, dbPassword: string) {
    const validPassword = compareSync(bodyPassword, dbPassword);
    if (!validPassword) {
      return { status: 400, message: 'Senha incorreta' };
    }
  }

  static bodyValidation(email: string, password: string) {
    if (!email || email.length === 0) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (password.length < 7) {
      return { status: 400, message: 'Senha com menos que 7 caracteres' };
    }
  }
}
