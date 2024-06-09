import {
  MiddlewareConsumer,
  Module,
  // NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilitiesModule } from './utilities/utils.module';
import { winstonLogger } from './utilities/logger';
import { MorganMiddleware } from './middlewares/morgan.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      ...winstonLogger,
    }),
    UtilitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule /*implements NestModule*/ {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    //   consumer.apply().forRoutes({ path: 'wallets*', method: RequestMethod.ALL });
    //   consumer
    //     .apply()
    //     .forRoutes({ path: 'transfers*', method: RequestMethod.ALL });
    //   consumer
    //     .apply()
    //     .forRoutes({ path: 'wallet-transactions*', method: RequestMethod.ALL });
    // }
  }
}
