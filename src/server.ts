import http from 'http';
import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import './config/mongo';
// rutas
import userRouter from './routes/user';
import chatRoomRouter from './routes/chatRoom';
import deleteRouter from './routes/delete';
import indexRouter from './routes/index';
// middlewares
import { decode } from 'jsonwebtoken'; 

const app = express();

const port = process.env.PORT || '3000';

app.set("port", port);

app.use(logger('dev')); // mostrar peticiones en la consola
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // objetos planos no anidados

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/room', decode, chatRoomRouter);
app.use('/delete', deleteRouter);

// mostrar esta dirección si un usuario entra de casualidad a otra ruta
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `API Endpoint doesn't exist`
  });
});

// crear servidor http
const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}`);
});
