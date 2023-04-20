import { NextFunction, Response } from 'express';
import { IRequestCustom } from '../types/reqType';

export const userId = (req: IRequestCustom, res: Response, next: NextFunction) => {
  req.user = {
    _id: '644148a555e1712067d82d2f',
  };
  next();
};

export default userId;
