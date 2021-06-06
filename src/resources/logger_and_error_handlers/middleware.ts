import { finished } from 'stream';
import logger from './logger';

export const err = () => {
  logger.error('error', 'error message!');
};

export const logging = (req: any, res: any, next: Function): void => {
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
