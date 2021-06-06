import { finished } from 'stream';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const exceptionLogger = (err: Error): void => {
  logger.error(`Exeption error ${err}`);
};

const rejectionLogger = (err: Error): void => {
  logger.error(`Rejection ${err}`);
};

const errorHandler = (err: Error, _: Request, res: Response, next: NextFunction): void => {
  logger.error(`${err.message}, status code: 500`);
  res.status(500).send('Something break!');
  next();
};

const logging = (req: Request, res: Response, next: NextFunction): void => {
  const { originalUrl, method, params, query, body } = req;

  next();

  finished(res, () => {
    const { statusCode } = res;
    logger.info(
      `method: ${method}, url: ${originalUrl}, query parametrs: ${JSON.stringify(
        query,
      )}, request parametrs: ${JSON.stringify(params)}, body: ${JSON.stringify(
        body,
      )}, status code: ${statusCode}`,
      { httpReq: true },
    );
  });
};

export default { exceptionLogger, rejectionLogger, errorHandler, logging };
