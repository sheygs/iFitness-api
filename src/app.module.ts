import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DatabaseModule,
  UtilitiesModule,
  winstonLogger,
  MorganMiddleware,
  HttpExceptionFilter,
  AllExceptionsFilter,
} from './shared';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply()
      .forRoutes({ path: 'memberships*', method: RequestMethod.ALL });
    consumer
      .apply()
      .forRoutes({ path: 'add-on-services*', method: RequestMethod.ALL });
  }
}
