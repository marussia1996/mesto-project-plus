import { ObjectId } from 'mongoose';
import { Request } from 'express';

//  расширеннный интерфейс для request
export interface IRequestCustom extends Request {
  user?: {
    _id: string | ObjectId;
  }
}
