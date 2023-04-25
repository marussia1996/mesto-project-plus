import { NextFunction, Request, Response } from 'express';
import { IRequestCustom } from '../types/reqType';
import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';
import { CREATED_CODE, NOT_FOUND_CODE, OK } from '../constants/error';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.status(OK).send(users))
  .catch((err) => next(err));

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => {
      next(err);
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.findById(id)
    .orFail(() => new ErrorResponse('Пользователь по указанному _id не найден', NOT_FOUND_CODE))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

export const updateProfile = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new ErrorResponse('Пользователь по указанному _id не найден', NOT_FOUND_CODE))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

export const updateAvatar = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user?._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new ErrorResponse('Пользователь по указанному _id не найден', NOT_FOUND_CODE))
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};
