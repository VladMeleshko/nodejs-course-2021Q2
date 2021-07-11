import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger_and_error_handlers/event-logger';
import { ValidateSessionGuard } from './login/validate-session.guard';
import { ErrorHandlingFilter } from './logger_and_error_handlers/error-handling.filter';
import config from './common/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';

const logger = new LoggerService();

async function bootstrap() {
  const engine = config.USE_FASTIFY
    ? new FastifyAdapter()
    : new ExpressAdapter();

  const app = await NestFactory.create(AppModule, engine);
  const logger = new LoggerService();

  app.useGlobalGuards(new ValidateSessionGuard());

  app.use(logger.use);

  app.useGlobalFilters(new ErrorHandlingFilter(logger));

  await app.listen(config.PORT, '0.0.0.0');
}
bootstrap();

process.on('uncaughtException', (err) => {
  logger.exceptionLogger(err);
});

process.on('unhandledRejection', async (_promiseInfo, promise) => {
  const err = await promise.catch((error) => error);
  logger.rejectionLogger(err);
});
