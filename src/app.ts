import mongoose from 'mongoose';
import express from 'express';
import { errors } from 'celebrate';
import indexRouter from './routes/index';
import { createUserValidation, loginValidation } from './validation/userValidation';
import { createUser, login } from './controllers/users';
import auth from './middleware/auth';
import errorHandler from './middleware/error';
import { errorLogger, requestLogger } from './middleware/logger';

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

app.use(errorLogger); // подключаем логер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
