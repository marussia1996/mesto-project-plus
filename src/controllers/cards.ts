import { Request, Response, NextFunction } from 'express';
import { IRequestCustom } from '../types/reqType';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate(['owner', 'likes']) //  чтобы получить всю информацию о создателе
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    next(err);
  });

export const createCard = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const id = req.user?._id;
  return Card.create({ name, link, owner: id })
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(201).send(card);
      }
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка по указанному _id не найден' });
      } else {
        res.status(200).send({ message: 'Пост удалён' });
      }
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
  .populate(['owner', 'likes'])
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка по указанному _id не найден' });
    } else {
      res.status(200).send(card);
    }
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
  .populate(['owner', 'likes'])
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка по указанному _id не найден' });
    } else {
      res.status(200).send(card);
    }
  })
  .catch((err) => {
    next(err);
  });
