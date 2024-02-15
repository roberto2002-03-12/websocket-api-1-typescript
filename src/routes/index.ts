import express, { NextFunction, Request, Response } from 'express';
import { encode } from '../middlewares/jwt';
import { ResponseHttp, IJwtRequest, EncodeMiddleware } from '../models/classes';

const router = express.Router();

router.post('/login', encode, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(new ResponseHttp(true, (req as IJwtRequest).authToken))
});

export default router;