import UserModel from '../database/models/UsersModel';

export default class UserService {
  static async login(email: string, _password: string) {
    const response = await UserModel.findOne({ where: { email } });

    if (!response) {
      throw new Error('usuario não encontrado');
    }

    return { token: 'token' };
  }
}
