import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization as string;

  if (!token) {
    res.status(400).json('Token not found');
  }

  try {
    verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};
