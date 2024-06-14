import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembershipsService } from './memberships.service';
import { Membership } from '../shared';
import { CacheService } from '../shared/redis/redis.service';
import { CreateMembershipDTO, GetMembershipDTO, MembershipType } from './dtos';

const mockMembershipRepository = {
  save: jest.fn(),
  findAndCount: jest.fn(),
  create: jest.fn(),
};

const mockCacheService = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('MembershipsService', () => {
  let service: MembershipsService;
  let repository: Repository<Membership>;
  let cacheService: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [RedisModule],
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership),
          useValue: mockMembershipRepository,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<MembershipsService>(MembershipsService);
    repository = module.get<Repository<Membership>>(
      getRepositoryToken(Membership),
    );
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMembership', () => {
    it('should create and save a new membership', async () => {
      const createMembershipDTO: CreateMembershipDTO = {
        firstName: 'John',
        lastName: 'Doe',
        membershipType: MembershipType.ANNUAL_PREMIUM,
        startDate: new Date('2023-01-01T00:00:00Z'),
        dueDate: new Date('2023-12-31T00:00:00Z'),
        totalAmount: '100',
        email: 'john.doe@example.com',
        isFirstMonth: true,
      };

      const membership = { ...createMembershipDTO, id: 1 };

      mockMembershipRepository.create.mockReturnValue(membership);
      mockMembershipRepository.save.mockResolvedValue(membership);

      const result = await service.createMembership(createMembershipDTO);

      expect(repository.create).toHaveBeenCalledWith({
        ...createMembershipDTO,
        totalAmount: Number(createMembershipDTO.totalAmount),
      });
      expect(repository.save).toHaveBeenCalledWith(membership);
      expect(result).toEqual(membership);
    });
  });

  describe('getMemberships', () => {
    it('should return cached memberships if available', async () => {
      const getMembershipDTO: GetMembershipDTO = {
        page: '1',
        size: '10',
        withDueDate: true,
      };

      const cachedResult = {
        total: 1,
        page: 1,
        size: 10,
        result: [
          {
            id: 1,
            firstName: 'Cached',
            lastName: 'Membership',
            membershipType: MembershipType.ANNUAL_PREMIUM,
            startDate: new Date('2023-01-01T00:00:00Z'),
            dueDate: new Date('2023-12-31T00:00:00Z'),
            totalAmount: '100',
            email: 'cached@example.com',
            isFirstMonth: true,
            addOnServices: [],
            invoices: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          } as any as Membership,
        ],
        totalPages: 1,
      };

      mockCacheService.get.mockResolvedValue(cachedResult);

      const result = await service.getMemberships(getMembershipDTO);

      expect(cacheService.get).toHaveBeenCalledWith('memberships_1_10_true');

      expect(result).toEqual(cachedResult);
    });
  });
});
