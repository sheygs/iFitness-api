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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MembershipsService, PaginatedMembership } from './memberships.service';
import { CreateMembershipDTO, GetMembershipDTO } from './dtos';
import { Membership, SuccessResponse, Utils } from '../shared';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(
    private membershipService: MembershipsService,
    private utils: Utils,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @ApiOperation({ summary: 'Create membership' })
  @ApiBody({
    type: CreateMembershipDTO,
  })
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
  @ApiOperation({
    summary: 'Get all memberships',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
    description: 'Page Number',
  })
  @ApiQuery({
    name: 'size',
    type: String,
    required: false,
    description: 'Size Per Page',
  })
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
