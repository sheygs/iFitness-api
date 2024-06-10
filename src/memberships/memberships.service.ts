import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Membership } from '../shared';
import { InjectRepository } from '@nestjs/typeorm';
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
  constructor(
    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
  ) {}

  async createMembership(body: CreateMembershipDTO): Promise<Membership> {
    const membership = this.membershipRepo.create({
      ...body,
      totalAmount: Number(body.totalAmount),
    });

    return await this.membershipRepo.save(membership);
  }

  async getMemberships(params: GetMembershipDTO): Promise<PaginatedMembership> {
    const { page, size } = params;

    const [memberships, total] = await this.membershipRepo.findAndCount({
      ...(page && { skip: (+page - 1) * +size }),
      ...(size && { take: +size }),

      relations: {
        addOnServices: true,
      },
    });

    const totalPages = +size ? Math.ceil(total / +size) : 0;

    return {
      total,
      ...(page && { page: +page }),
      ...(size && { size: +size }),
      result: memberships,
      totalPages,
    };
  }
}
