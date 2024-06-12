import { Test, TestingModule } from '@nestjs/testing';
import { BillingsService } from './billings.service';
import { MembershipsService } from '../memberships/memberships.service';

describe('BillingsService', () => {
  let service: BillingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingsService,
        {
          provide: MembershipsService,
          useValue: {
            getMemberships: jest.fn().mockResolvedValue([]),
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
