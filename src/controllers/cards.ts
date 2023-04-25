import { Request, Response, NextFunction } from 'express';
import { IRequestCustom } from '../types/reqType';
import Card from '../models/card';
import ErrorResponse from '../utils/errorResponse';
import { CREATED_CODE, NOT_FOUND_CODE } from '../constants/statusCode';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate(['owner', 'likes']) //  чтобы получить всю информацию о создателе
  .then((cards) => res.send(cards))
  .catch((err) => {
    next(err);
  });

export const createCard = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user?._id;
  return Card.create({ name, link, owner: id })
    .then((card) => {
      res.status(CREATED_CODE).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Card.findByIdAndDelete(id)
    .orFail(() => new ErrorResponse('Карточка по указанному _id не найдена', NOT_FOUND_CODE))
    .then(() => {
      res.send({ message: 'Пост удалён' });
    })
    .catch((err) => {
      next(err);
    });
};

export const likeCard = (
  req: IRequestCustom,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user?._id } },
  { new: true },
)
  .orFail(() => new ErrorResponse('Карточка по указанному _id не найдена', NOT_FOUND_CODE))
  .populate(['owner', 'likes'])
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    next(err);
  });

export const dislikeCard = (
  req: IRequestCustom,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user?._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(() => new ErrorResponse('Карточка по указанному _id не найдена', NOT_FOUND_CODE))
  .populate(['owner', 'likes'])
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    next(err);
  });
