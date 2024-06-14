import { Test, TestingModule } from '@nestjs/testing';
import { BillingsService } from './billings.service';
import { MembershipsService } from '../memberships/memberships.service';
import { QueueModule } from '../shared/queues/queue.module';
import { InvoicesService } from '../invoices/invoices.service';

describe('BillingsService', () => {
  let service: BillingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QueueModule],
      providers: [
        BillingsService,
        {
          provide: MembershipsService,
          useValue: {
            getMemberships: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: InvoicesService,
          useValue: {
            updateInvoice: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<BillingsService>(BillingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
