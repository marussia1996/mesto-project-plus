import { Router } from 'express';
import userId from '../middleware/userId';
import userRouter from './users';
import cardRouter from './cards';
import errorHandler from '../middleware/error';

const indexRouter = Router();

indexRouter.use(userId);

indexRouter.use('/users', userRouter);

indexRouter.use('/cards', cardRouter);
//  ERROR MIDDLEWARE
indexRouter.use(errorHandler);

export default indexRouter;
