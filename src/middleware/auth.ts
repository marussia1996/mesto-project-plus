import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/statusCode';
import ErrorResponse from '../utils/errorResponse';

export interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

const handleAuthError = (res: Response) => {
  throw new ErrorResponse('Необходима авторизация', UNAUTHORIZED)
};

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

/* eslint-disable-next-line */
export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload as { _id: JwtPayload }; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
