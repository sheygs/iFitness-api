import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Membership } from '../shared';
import { CacheService } from '../shared/redis/redis.service';
import { CreateMembershipDTO, GetMembershipDTO } from './dtos';

export interface PaginatedMembership {
  total: number;
  page?: number;
  size?: number;
  result: Membership[];
  totalPages: number;
}

@Injectable()
export class MembershipsService {
  private readonly logger = new Logger(MembershipsService.name);

  constructor(
    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
    private cacheService: CacheService,
  ) {}

  public getCurrentDate(): Date {
    const now = new Date();

    // set time to beginning of the day
    now.setHours(0, 0, 0, 0);

    return now;
  }

  async createMembership(body: CreateMembershipDTO): Promise<Membership> {
    const membership = this.membershipRepo.create({
      ...body,
      totalAmount: Number(body.totalAmount),
    });

    return await this.membershipRepo.save(membership);
  }

  async getMemberships(params: GetMembershipDTO): Promise<PaginatedMembership> {
    const currentDate = this.getCurrentDate();

    const { page, size, withDueDate } = params;

    const key = `memberships${page ? `_${page}` : ''}${size ? `_${size}` : ''}${withDueDate ? `_${withDueDate}` : ''}`;

    this.logger.verbose(`cacheKey:${key}`);

    const cachedResult = await this.cacheService.get<PaginatedMembership>(key);

    if (cachedResult) {
      this.logger.verbose('spooling results from cache');

      return cachedResult;
    }

    this.logger.verbose('retrieving results from data store');

    const [memberships, total] = await this.membershipRepo.findAndCount({
      ...(page && { skip: (+page - 1) * +size }),
      ...(size && { take: +size }),

      relations: {
        addOnServices: true,
        invoices: true,
      },

      ...(withDueDate && {
        where: {
          dueDate: MoreThanOrEqual(currentDate),
        },
      }),
    });

    const totalPages = +size ? Math.ceil(total / +size) : 0;

    const result: PaginatedMembership = {
      total,
      ...(page && { page: +page }),
      ...(size && { size: +size }),
      result: memberships,
      totalPages,
    };

    await this.cacheService.set(key, result, +process.env.REDIS_CACHE_TTL);

    return result;
  }
}
