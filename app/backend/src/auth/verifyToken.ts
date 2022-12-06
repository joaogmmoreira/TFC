import { Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (res: Response, authorization: string | undefined) => {
  if (!authorization) {
    return res.status(400).json('Token not found');
  }

  verify(authorization, JWT_SECRET);
};
