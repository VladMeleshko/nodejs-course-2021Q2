import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger_and_error_handlers/event-logger';
import { ValidateSessionGuard } from './login/validate-session.guard';
import { ErrorHandlingFilter } from './logger_and_error_handlers/error-handling.filter';

const logger = new LoggerService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new LoggerService();

  app.useGlobalGuards(new ValidateSessionGuard());

  app.use(logger.use);

  app.useGlobalFilters(new ErrorHandlingFilter(logger));

  await app.listen(4000, '0.0.0.0');
}
bootstrap();

process.on('uncaughtException', (err) => {
  logger.exceptionLogger(err);
});

process.on('unhandledRejection', async (_promiseInfo, promise) => {
  const err = await promise.catch((error) => error);
  logger.rejectionLogger(err);
});
