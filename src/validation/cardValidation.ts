import { Joi, celebrate } from 'celebrate';
import avatarRegExp from '../constants/avatarRegExp';

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(avatarRegExp).required(),
  }),
});

export const getCardValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
