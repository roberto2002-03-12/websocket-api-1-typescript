import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import { getUserByUserNameAndVerify } from '../services';
import config from '../config';
import { IJwtRequest, IJwtCustomPayload, HttpError } from '../models/classes';

const decode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['authorization']) {
      return res.status(400).json({ success: false, response: 'No access token provided' });
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(accessToken, config.jwtSignKey) as IJwtCustomPayload;

    const expiracion = decoded.exp ?? 0; // Obtenemos la fecha de expiración en formato UNIX timestamp

    // Comparamos la fecha de expiración con la fecha actual en segundos
    const expirado = expiracion < Date.now() / 1000;

    if (expirado) return res.status(401).json({ success: false, response: 'Token expirado' });

    (req as IJwtRequest).userId = decoded.userId;
    (req as IJwtRequest).userType = decoded.userType;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, response: error })
  }
};

const encode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;

    const user = await getUserByUserNameAndVerify(userName as string, password as string);
    const payload = {
      userId: user._id,
      userType: user.typeUser
    };

    const authToken = jwt.sign(payload, config.jwtSignKey, { expiresIn: '4h' });
    
    (req as IJwtRequest).authToken = authToken;
    
    next();
  } catch (error) {
    if (error instanceof HttpError) return res.status(401).json(error);
    return res.status(400).json({
      success: false,
      response: error
    });
  }
};

export {
  decode,
  encode
}