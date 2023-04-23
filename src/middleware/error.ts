import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err: ErrorResponse, req: Request, res:Response, next: NextFunction) => {
  console.log(err.name)
  let error = { ...err };
  if (err.name === 'CastError') {
    const message = 'Пользователь/Карточка по указанному _id не найден';
    error = new ErrorResponse(message, 404);
  }
  else if (err.name === 'ValidationError') {
    const message = 'Переданы некорректные данные при создании/обновлении пользователя';
    error = new ErrorResponse(message, 400);
  }
  console.log(error.statusCode)
  res.status(error.statusCode || 500).json({
    message: error.message || 'Ошибка сервера',
  });
};
export default errorHandler;
