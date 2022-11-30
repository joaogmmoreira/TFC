import { sign } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (data: IUser) => {
  const userToken = sign(
    { userId: data.id, role: data.role },
    JWT_SECRET,
    { algorithm: 'HS256',
      expiresIn: '7d' },
  );

  return userToken;
};
