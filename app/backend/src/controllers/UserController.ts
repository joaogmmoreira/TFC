import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { type, message } = await this.service.userLogin(email, password);

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ token: message });
  };

  validateLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const { type, message } = await this.service.validateLogin(authorization);

    return res.status(type).json({ role: message });
  };
}
