import express from 'express';
import { CustomError } from '../utils/exceptions';
import HttpResponder from '../utils/HttpResponder';
import logger from '../utils/logger';

const errorHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): void => {
  if (err instanceof CustomError) {
    const { name, message, code } = err;
    logger.info(`${name}: ${message}`);
    return new HttpResponder(res).fail(code, message);
  }

  logger.error(err.message);
  const errorMessage = 'Something went wrong, try again.';
  return new HttpResponder(res).fail(500, errorMessage);
};

export default errorHandler;
