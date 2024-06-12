import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MembershipsService } from '../memberships/memberships.service';

@Injectable()
export class BillingsService {
  constructor(private membershipService: MembershipsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async runJobScheduler() {
    const membership = await this.membershipService.getMemberships({
      page: '',
      size: '',
      withDueDate: true,
    });

    console.log({ membership });
  }
}
