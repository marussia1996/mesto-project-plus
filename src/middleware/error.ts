import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err: ErrorResponse, req: Request, res:Response, next: NextFunction) => {
  let error = { ...err };
  if (err.name === 'CastError') {
    const message = 'Пользователь/Карточка по указанному _id не найден';
    error = new ErrorResponse(message, 404);
  }
  if (err.name === 'ValidationError') {
    const message = 'Переданы некорректные данные при создании/обновлении пользователя';
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    message: error.message || 'Ошибка сервера',
  });
  next();
};
export default errorHandler;
