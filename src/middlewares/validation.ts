import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from 'express';
import createHttpError from "http-errors";

export function validationMiddleware(schema: ObjectSchema, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const cleanedMessage = error.message.split(`\"`).join("'");

      next(createHttpError(400, cleanedMessage));
    }

    next();
  };
};