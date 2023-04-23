import { NextFunction, Response } from 'express';
import { IRequestCustom } from '../types/reqType';

const userId = (req: IRequestCustom, res: Response, next: NextFunction) => {
  req.user = {
    _id: '644502eeb9abb2717ee8ca50',
  };
  next();
};

export default userId;
