import { Router } from 'express';
import {
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', createUser);

userRouter.get('/:id', getUserById);

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
