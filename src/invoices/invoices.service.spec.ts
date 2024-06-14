import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from '../shared';
import { InvoicesService } from './invoices.service';
import { Repository } from 'typeorm';

const mockInvoiceRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('Invoices Service', () => {
  let service: InvoicesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: MockRepository<Invoice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: mockInvoiceRepository(),
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    repository = module.get<MockRepository<Invoice>>(
      getRepositoryToken(Invoice),
    );
  });

  describe('update Invoice', () => {
    it('should update the invoice if found', async () => {
      const membershipID = 1;
      const totalAmount = 500;
      const invoice = new Invoice();

      invoice.membershipID = membershipID;
      invoice.totalAmount = 100;

      (repository.findOne as jest.Mock).mockResolvedValue(invoice);
      (repository.save as jest.Mock).mockResolvedValue(invoice);

      await service.updateInvoice(membershipID, totalAmount);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          membershipID,
        },
      });
      expect(invoice.totalAmount).toBe(totalAmount);
      expect(invoice.invoiceDateTime).toBeInstanceOf(Date);
      expect(repository.save).toHaveBeenCalledWith(invoice);
    });

    it('should return if the invoice is not found', async () => {
      const membershipID = 1;
      const totalAmount = 500;

      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await service.updateInvoice(membershipID, totalAmount);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          membershipID,
        },
      });
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw an error if repository throws an error', async () => {
      const membershipID = 1;
      const totalAmount = 500;

      (repository.findOne as jest.Mock).mockRejectedValue(
        new Error('Repository error'),
      );

      await expect(
        service.updateInvoice(membershipID, totalAmount),
      ).rejects.toThrow('Repository error');
    });
  });
});
