import express from 'express';
import { getUserController, addUserController } from '../controllers/UserController';
const userRouter = express.Router();

userRouter.post('/add-user', addUserController);
userRouter.get('/user/:id', getUserController);

export default userRouter;