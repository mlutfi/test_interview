import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { HISReponse } from '../types/response.type';
import Logger from '../helpers/winston.helper';

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      // bind response
      let response: HISReponse = {
        code: '400',
        message: `${JSON.parse((error as Error).message)[0].message}`,
        data: {},
      };

      // create log
      Logger.warn('VALIDATION ERROR -', response);

      return res.status(400).json(response);
    }
  };

export default validate;
