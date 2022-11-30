import { decode, JwtPayload } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET as string;

export default (authorization: string) => {
  const decodedToken = decode(authorization);
  return decodedToken as JwtPayload;
};
