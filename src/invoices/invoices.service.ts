import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../shared';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
  ) {}

  public async updateInvoice(membershipID: number, totalAmount: number) {
    try {
      const invoice = await this.invoiceRepo.findOne({
        where: {
          membershipID,
        },
      });

      if (!invoice) return;

      invoice.invoiceDateTime = new Date();

      invoice.totalAmount = totalAmount;

      await this.invoiceRepo.save(invoice);
    } catch (error) {
      throw error;
    }
  }
}
