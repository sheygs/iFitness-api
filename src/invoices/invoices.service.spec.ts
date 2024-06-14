import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from '../shared';
import { InvoicesService } from './invoices.service';
import { Repository } from 'typeorm';

const mockInvoiceRepository = {
  findOne: jest.fn(),
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Invoice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    repository = module.get<Repository<Invoice>>(getRepositoryToken(Invoice));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
