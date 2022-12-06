import { Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (res: Response, authorization: string | undefined) => {
  if (!authorization) {
    return res.status(400).json('Token not found');
  }

  try {
    verify(authorization, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
