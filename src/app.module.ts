import 'dotenv/config';
import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
} from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings';
import { MembershipsModule } from './memberships/memberships.module';
import { QueueModule } from './shared/queues/queue.module';
import { InvoicesModule } from './invoices/invoices.module';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: 3000,
        removeOnComplete: true,
      },
    }),

    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      ...winstonLogger,
    }),
    DatabaseModule,
    QueueModule,
    UtilitiesModule,
    MembershipsModule,
    BillingsModule,
    InvoicesModule,
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
