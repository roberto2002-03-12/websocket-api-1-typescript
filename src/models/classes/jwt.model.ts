import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express'

export interface IJwtRequest extends Request {
  authToken: string;
  userId: string;
  userType: string;
}

export interface IJwtCustomPayload extends JwtPayload {
  userId: string;
  userType: string;
}

export type EncodeMiddleware = (req: IJwtRequest, res: Response, next: NextFunction) => Promise<any>;