import mongoose from 'mongoose';
import express from 'express';
import { userId } from './middleware/userId';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import errorHandler from './middleware/error';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

//  подключаемся к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  autoIndex: true,
  autoCreate: true,
});

app.use(userId);

app.use('/users', userRouter);

app.use('/cards', cardRouter);
//  ERROR MIDDLEWARE
app.use(errorHandler);

app.listen(PORT);
