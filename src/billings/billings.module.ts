import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { MembershipsModule } from '../memberships/memberships.module';
import { QueueModule } from '../shared/queues/queue.module';

@Module({
  imports: [MembershipsModule, QueueModule],
  providers: [BillingsService],
  exports: [BillingsService],
})
export class BillingsModule {}
