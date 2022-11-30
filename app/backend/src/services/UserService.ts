import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';
import generateToken from '../auth/generateToken';
import validateToken from '../auth/validateToken';

export default class UserService {
  private userModel = userModel;

  userLogin = async (email: string, password: string) => {
    if (!email || !password) {
      return { type: 400, message: 'All fields must be filled' };
    }

    const data = await this.userModel.findOne({ where: { email } }) as IUser;

    if (!data) {
      return { type: 401, message: 'Incorrect email or password' };
    }

    const passwordValidation = bcrypt.compareSync(password, data.password);

    if (!passwordValidation) {
      return { type: 401, message: 'Incorrect email or password' };
    }

    const token = generateToken(data);

    return { type: null, message: token };
  };

  validateLogin = (authorization: string) => {
    const { role } = validateToken(authorization);

    return { type: 200, message: role };
  };
}
