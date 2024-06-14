import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { MembershipsModule } from '../memberships/memberships.module';
import { QueueModule } from '../shared/queues/queue.module';
import { InvoicesModule } from '../invoices/invoices.module';

@Module({
  imports: [MembershipsModule, QueueModule, InvoicesModule],
  providers: [BillingsService],
  exports: [BillingsService],
})
export class BillingsModule {}
