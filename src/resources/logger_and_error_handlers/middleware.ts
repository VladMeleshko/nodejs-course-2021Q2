import { finished } from 'stream';
import logger from './logger';
import { Request, Response, NextFunction } from 'express';

export const exceptionLogger = (err: Error): void => {
  logger.error(`Exeption error ${err}`);
};

export const rejectionLogger = (err: Error): void => {
  logger.error(`Rejection ${err}`);
};

export const err = (): void => {
  logger.error('error', 'error message!');
};

export const logging = (req: Request, res: Response, next: NextFunction): void => {
  const { url, method, params, query, body } = req;

  next();

  finished(res, () => {
    const { statusCode } = res;
    logger.info(
      `method: ${method}, url: ${url}, query parametrs: ${JSON.stringify(
        query,
      )}, request parametrs: ${JSON.stringify(params)}, body: ${JSON.stringify(
        body,
      )}, status code: ${statusCode}`,
      { httpReq: true },
    );
  });
};
