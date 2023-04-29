import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import errorHandler from '../middleware/error';
import auth from '../middleware/auth';

const indexRouter = Router();

indexRouter.use('/users', userRouter);

indexRouter.use('/cards', cardRouter);

export default indexRouter;
