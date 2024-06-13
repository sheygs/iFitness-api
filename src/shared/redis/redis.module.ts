import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './redis.service';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: 'redis',
      socket: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
  ],
  providers: [CacheService],
  // export CacheService and CacheModule for use in other modules
  exports: [CacheService, CacheModule],
})
export class RedisModule {}
