import { hostname } from 'os';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { middlewares } from './app';
import { winstonLogger, exitLog } from './shared/utilities/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      ...winstonLogger,
    }),
  });

  const port = +process.env.PORT ?? 4000;

  middlewares(app);

  process
    .on('SIGINT', () => exitLog(null, 'SIGINT'))
    .on('SIGQUIT', () => exitLog(null, 'SIGQUIT'))
    .on('SIGTERM', () => exitLog(null, 'SIGTERM'))
    .on('uncaughtException', (error) => exitLog(error, 'uncaughtException'))
    .on('beforeExit', () => exitLog(null, 'beforeExit'))
    .on('exit', () => exitLog(null, 'exit'));

  await app.listen(port, () => {
    process.stdout.write(`⚙️ Env: ${process.env.NODE_ENV}\n`);
    process.stdout.write(`⏱ Started on: ${Date.now()}\n`);
    Logger.verbose(`🚀 ifitness-backend listening on http://${hostname()}:${port}`);
  });
}

bootstrap();
