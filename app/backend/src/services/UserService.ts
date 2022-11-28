import { compareSync } from 'bcryptjs';

import UserModel from '../database/models/UsersModel';

export default class UserService {
  static async login(email: string, password: string) {
    const response = await UserModel.findOne({ where: { email } });

    if (!response) {
      throw new Error('usuario não encontrado');
    }

    if (password.length < 7) {
      console.log('Senha com menos de 7 caracteres');
      throw new Error('Senha tem menos de 7 caracteres');
    }

    if (!(this.passwordValidation(password, response.password))) {
      console.log('Senha errada');
      throw new Error('Senha errada');
    }

    return { token: 'token' };
  }

  static passwordValidation(bodyPassword: string, dbPassword: string): boolean {
    const validPassword = compareSync(bodyPassword, dbPassword);
    return validPassword;
  }
}
