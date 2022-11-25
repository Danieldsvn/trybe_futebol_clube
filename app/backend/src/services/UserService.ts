import UserModel from "../models/UserModel";

export default class UserService {
  constructor(
    private userModel: UserModel;
  ) {}

  async login(email: string, password: string) {
    if(!(this.validatePassword(password))) return { message: "Senha menor de 6 caracteres"}

    const response = await this.userModel.login(email, password);
    if(response.length === 0) return { message: 'usuario não encontrado'}

    return { token: 'token' };
  }

  validatePassword(password: string) {
    if(password.length > 6 ) true;
    return false;
  }
}