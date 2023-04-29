import mongoose from 'mongoose';
import express from 'express';
import indexRouter from './routes/index';
import { createUser, login } from './controllers/users';
import auth from './middleware/auth';
import errorHandler from './middleware/error';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  подключаемся к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  autoIndex: true,
  autoCreate: true,
});

app.post('/signin', login);

app.post('/signup', createUser);

//защищаем все роуты кроме страницы регистрации и логина
app.use(auth);

app.use(indexRouter);

app.use(errorHandler);

app.listen(PORT);
