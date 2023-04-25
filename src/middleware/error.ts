/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
import { BAD_REQUEST_CODE, NOT_FOUND_CODE, SERVER_ERROR } from '../constants/error';

const errorHandler = (err: ErrorResponse, req: Request, res:Response, next: NextFunction) => {
  if (err.name === 'CastError') {
    const message = 'Ошибка валидации. Невалидный _id';
    err = new ErrorResponse(message, NOT_FOUND_CODE);
  }
  if (err.name === 'ValidationError') {
    const message = 'Переданы некорректные данные при создании/обновлении данных';
    err = new ErrorResponse(message, BAD_REQUEST_CODE);
  }
  res.status(err.statusCode || SERVER_ERROR).json({
    message: err.message || 'Ошибка сервера',
  });
  next();
};
export default errorHandler;
