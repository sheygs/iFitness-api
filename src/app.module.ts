import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { UtilitiesModule } from './shared/utilities/utils.module';
import { winstonLogger } from './shared/utilities/logger';
import { MorganMiddleware } from './shared/middlewares/morgan.middleware';
import { HttpExceptionFilter, AllExceptionsFilter } from './shared/filters';

@Module({
  imports: [
    WinstonModule.forRoot({
      ...winstonLogger,
    }),
    UtilitiesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
