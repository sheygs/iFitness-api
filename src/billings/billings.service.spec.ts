import { Test, TestingModule } from '@nestjs/testing';
import { BillingsService } from './billings.service';
import { MembershipsService } from '../memberships/memberships.service';
import { QueueModule } from '../shared/queues/queue.module';
import { QueueService } from '../shared/queues/queue.service';

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
          provide: QueueService,
          useValue: {},
        },

        // {
        //   provide: QueueService,
        //   useValue: {
        //     addEmailJob: jest.fn().mockResolvedValue(),
        //   },
        // },
      ],
    }).compile();

    service = module.get<BillingsService>(BillingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
