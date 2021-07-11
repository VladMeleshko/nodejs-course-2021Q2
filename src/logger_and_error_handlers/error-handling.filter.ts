import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { LoggerService } from './event-logger';

@Catch()
export class ErrorHandlingFilter implements ExceptionFilter {
  constructor(@Inject() private loggerService: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    exception.message;
    this.loggerService.errorHandler(
      exception.message || 'Internal server problem',
      exception.getStatus() || 500,
    );

    res
      .status(exception.getStatus() || 500)
      .send(exception.getResponse() || 'Internal server problem');
  }
}
