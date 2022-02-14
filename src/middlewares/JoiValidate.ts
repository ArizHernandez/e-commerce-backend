import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';

export default (schema: AnySchema, property: 'body' | 'query' | 'params') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    
    if (error) {
      const err: any = new Error();
      err.message = 'Bad request';
      err.statusCode = 400;
      err.data = error.details.map((detail: any) => detail.message);
      err.error = error.details;
      return next(err);
    }
    
    next();
  };
};
