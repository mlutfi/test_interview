import { NextFunction, Request, Response } from 'express';

const header = (req: Request, res: Response, next: NextFunction) => {
  let contentTypeHeader = req.headers['content-type'];
  if (contentTypeHeader === 'application/json') {
    next();
  } else {
    return res.status(401).json({
      code: '401',
      message: 'invalid request. content-type must be application/json',
      data: {},
    });
  }
};

export default header;
