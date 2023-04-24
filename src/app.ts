import mongoose from 'mongoose';
import express from 'express';
import indexRouter from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);
//  подключаемся к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  autoIndex: true,
  autoCreate: true,
});

app.use(indexRouter);

app.listen(PORT);
