import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req, res) => {
  userController.userLogin(req, res);
  // console.log('oi');
});

export default userRouter;
