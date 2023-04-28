import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IRequestCustom } from '../types/reqType';
import User from '../models/user';
import ErrorResponse from '../utils/errorResponse';
import { CONFLICT_CODE, CREATED_CODE, NOT_FOUND_CODE } from '../constants/statusCode';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => next(err));

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
  .then((hash: string) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
  .then((user) => res.status(CREATED_CODE).send(user))
  .catch((err) => {
    if(err.code === 11000){
      res.status(CONFLICT_CODE).send({message: "Пользователь с переданным email уже существует"})
    }
    next(err);
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', {expiresIn: '7d'}),
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const getCurUser = (req: IRequestCustom, res: Response, next: NextFunction) => {
  return User.findById(req.user?._id)
    .orFail(() => new ErrorResponse('Пользователь по указанному _id не найден', NOT_FOUND_CODE))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
}
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.findById(id)
    .orFail(() => new ErrorResponse('Пользователь по указанному _id не найден', NOT_FOUND_CODE))
    .then((user) => {
      res.send(user);
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
      res.send(user);
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
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
