import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  userLogin = async (req: Request, res: Response) => {
    console.log('controller');
    const { email, password } = req.body;

    const { type, message } = await this.service.userLogin(email, password);

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ token: message });
  };
}
