import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import userModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET as string;

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

    const userToken = jwt.sign(
      { userId: data.id },
      JWT_SECRET,
      { algorithm: 'HS256',
        expiresIn: '7d' },
    );

    return { type: null, message: userToken };
  };
}
