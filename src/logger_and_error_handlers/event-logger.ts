import { finished } from 'stream';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

@Injectable()
export class LoggerService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, params, query, body } = req;

    next();

    finished(res, () => {
      const { statusCode } = res;
      logger.info(
        `method: ${method}, url: ${originalUrl}, query parametrs: ${JSON.stringify(
          query,
        )}, request parametrs: ${JSON.stringify(
          params,
        )}, body: ${JSON.stringify(body)}, status code: ${statusCode}`,
        { httpReq: true },
      );
    });
  }

  exceptionLogger = (err: Error): void => {
    logger.error(`Exeption error ${err}`);
    () => process.exit(1);
  };

  rejectionLogger = (err: Error): void => {
    logger.error(`Rejection error ${err}`);
    () => process.exit(1);
  };

  errorHandler = (err: string, statusCode: number): void => {
    logger.error(`${err}, status code: ${statusCode}`);
  };
}
