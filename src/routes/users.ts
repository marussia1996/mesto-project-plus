import { Router } from 'express';
import {
  getUsers, getUserById, updateProfile, updateAvatar, getCurUser,
} from '../controllers/users';
import { getUserByIdValidation, updateAvatarValidation, updateProfileValidation } from '../validation/userValidation';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getCurUser);

userRouter.get('/:id', getUserByIdValidation, getUserById);

userRouter.patch('/me', updateProfileValidation, updateProfile);

userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default userRouter;
