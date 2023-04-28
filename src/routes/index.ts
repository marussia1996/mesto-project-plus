import { Router } from 'express';
import userId from '../middleware/userId';
import userRouter from './users';
import cardRouter from './cards';
import errorHandler from '../middleware/error';
import { createUser, login } from '../controllers/users';
import auth from '../middleware/auth';

const indexRouter = Router();

indexRouter.use(userId);

indexRouter.post('/signin', login);

indexRouter.post('/signup', createUser);

//защищаем все роуты кроме страницы регистрации и логина
indexRouter.use(auth);

indexRouter.use('/users', userRouter);

indexRouter.use('/cards', cardRouter);
//  ERROR MIDDLEWARE
indexRouter.use(errorHandler);

export default indexRouter;
