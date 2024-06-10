import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MembershipsService, PaginatedMembership } from './memberships.service';
import { Membership, SuccessResponse, Utils } from '../shared';
import { CreateMembershipDTO, GetMembershipDTO } from './dtos';

@Controller('memberships')
export class MembershipsController {
  constructor(
    private membershipService: MembershipsService,
    private utils: Utils,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createMembership(
    @Body() body: CreateMembershipDTO,
  ): Promise<SuccessResponse<Membership>> {
    const membership = await this.membershipService.createMembership(body);

    if (!membership) {
      throw new UnprocessableEntityException('failed to create membership');
    }

    return this.utils.sucessResponse<Membership>(
      HttpStatus.CREATED,
      'created membership',
      membership,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getMemberships(
    @Query() params: GetMembershipDTO,
  ): Promise<SuccessResponse<PaginatedMembership>> {
    const memberships = await this.membershipService.getMemberships(params);

    return this.utils.sucessResponse<PaginatedMembership>(
      HttpStatus.OK,
      'spooled memberships',
      memberships,
    );
  }
}
