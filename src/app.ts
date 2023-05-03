import mongoose from 'mongoose';
import express from 'express';
import { errors } from 'celebrate';
import { createUser, login } from './controllers/users';
import indexRouter from './routes/index';
import { createUserValidation, loginValidation } from './validation/userValidation';
import auth from './middleware/auth';
import errorHandler from './middleware/error';
import { errorLogger, requestLogger } from './middleware/logger';
import ErrorResponse from './utils/errorResponse';
import { NOT_FOUND_CODE } from './constants/statusCode';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  подключаемся к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  autoIndex: true,
  autoCreate: true,
});

app.use(requestLogger); // подключаем логер запросов

app.post('/signin', loginValidation, login);

app.post('/signup', createUserValidation, createUser);

//  защищаем все роуты кроме страницы регистрации и логина
app.use(auth);

app.use(indexRouter);

app.use('*', (req, res, next) => {
  next(new ErrorResponse('Страница не найдена', NOT_FOUND_CODE));
});

app.use(errorLogger); // подключаем логер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
