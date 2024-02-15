import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../models/classes';

export function errorHandler() {
  return (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode ||  500;
    const response = err.response || { message: err.message };

    res.status(status).json({
      success: false,
      response
    });
  };
}