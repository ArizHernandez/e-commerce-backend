import {Request, Response, NextFunction} from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    const {statusCode, message, data, error} = err;    

    res.status(statusCode).json({
        status: 'error',
        data: data || null,
        error: error || '',
        message,
    });
}