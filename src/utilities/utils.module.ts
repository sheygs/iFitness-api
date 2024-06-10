import { Module } from '@nestjs/common';
import { Utilities } from './utils';

@Module({
  providers: [Utilities],
  exports: [Utilities],
})
export class UtilitiesModule {}
