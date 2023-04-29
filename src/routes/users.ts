import { Router } from 'express';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getCurUser,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getCurUser);

userRouter.get('/:id', getUserById);

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
