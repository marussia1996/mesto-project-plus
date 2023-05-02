import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import { createCardValidation, getCardValidation } from '../validation/cardValidation';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCardValidation, createCard);

cardRouter.delete('/:id', getCardValidation, deleteCard);

cardRouter.put('/:cardId/likes', getCardValidation, likeCard);

cardRouter.delete('/:cardId/likes', getCardValidation, dislikeCard);

export default cardRouter;
