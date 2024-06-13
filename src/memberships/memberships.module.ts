import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipsController } from './memberships.controller';
import { MembershipsService } from './memberships.service';
import { Membership, UtilitiesModule } from '../shared';
import { RedisModule } from '../shared/redis/redis.module';

@Module({
  imports: [
    RedisModule,
    UtilitiesModule,
    TypeOrmModule.forFeature([Membership]),
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
