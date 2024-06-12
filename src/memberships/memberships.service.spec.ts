import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembershipsService } from './memberships.service';
import { Membership } from '../shared';

// Mock the repository
const mockMembershipRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('MembershipsService', () => {
  let service: MembershipsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Membership>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership),
          useValue: mockMembershipRepository,
        },
      ],
    }).compile();

    service = module.get<MembershipsService>(MembershipsService);
    repository = module.get<Repository<Membership>>(
      getRepositoryToken(Membership),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
