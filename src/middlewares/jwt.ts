import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

const decode = (req: Request, res: Response, next: NextFunction) => {}
const encode = async (req: Request, res: Response, next: NextFunction) => {}

export {
  decode,
  encode
}