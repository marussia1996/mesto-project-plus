import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import errorHandler from '../middleware/error';

const indexRouter = Router();

indexRouter.use('/users', userRouter);

indexRouter.use('/cards', cardRouter);
//  ERROR MIDDLEWARE
indexRouter.use(errorHandler);

export default indexRouter;
