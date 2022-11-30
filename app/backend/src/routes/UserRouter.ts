import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/validate', (req, res) => {
  userController.validateLogin(req, res);
});

userRouter.post('/', (req, res) => {
  userController.userLogin(req, res);
});

export default userRouter;
