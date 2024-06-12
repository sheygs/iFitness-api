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
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembershipsModule } from './memberships/memberships.module';
import { BillingsModule } from './billings';
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
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      ...winstonLogger,
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UtilitiesModule,
    MembershipsModule,
    BillingsModule,
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
