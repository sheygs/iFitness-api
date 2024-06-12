import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { MembershipsModule } from '../memberships/memberships.module';

@Module({
  imports: [MembershipsModule],
  providers: [BillingsService],
  exports: [BillingsService],
})
export class BillingsModule {}
