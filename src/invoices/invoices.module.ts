import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { Invoice } from '../shared';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
