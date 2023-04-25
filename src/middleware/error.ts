import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
import { BAD_REQUEST_CODE, NOT_FOUND_CODE, SERVER_ERROR } from '../constants/statusCode';

const errorHandler = (err: ErrorResponse, req: Request, res:Response, next: NextFunction) => {
  // Эта переменная нужна, чтобы можно было достать имя ошибки + переназначить ошибке текст и статус
  let error = err;
  if (err.name === 'CastError') {
    const message = 'Ошибка валидации. Невалидный _id';
    error = new ErrorResponse(message, NOT_FOUND_CODE);
  }
  if (err.name === 'ValidationError') {
    const message = 'Переданы некорректные данные при создании/обновлении данных';
    error = new ErrorResponse(message, BAD_REQUEST_CODE);
  }
  res.status(error.statusCode || SERVER_ERROR).json({
    message: error.message || 'Ошибка сервера',
  });
  next();
};
export default errorHandler;
