import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MembershipsService } from '../memberships/memberships.service';
import { QueueService } from '../shared/queues/queue.service';
import { AddOnService, Membership } from '../shared';

@Injectable()
export class BillingsService {
  constructor(
    private membershipService: MembershipsService,
    private queueService: QueueService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendReminderJob() {
    const currentDate = this.membershipService.getCurrentDate();

    const memberships = await this.membershipService.getMemberships({
      page: '',
      size: '',
      withDueDate: true,
    });

    for (const membership of memberships.result) {
      if (membership.isFirstMonth) {
        await this.handleNewMemberReminder(membership, currentDate);
      } else {
        await this.handleExistingMemberReminder(membership, currentDate);
      }
    }
  }

  private calculateReminderDate(dueDate: Date, daysBefore: number): Date {
    const reminder = new Date(dueDate);

    reminder.setDate(reminder.getDate() - daysBefore);

    reminder.setHours(0, 0, 0, 0);

    return reminder;
  }

  private async handleNewMemberReminder(
    membership: Membership,
    currentDate: Date,
  ): Promise<void> {
    const { dueDate, membershipType, email, totalAmount } = membership;

    const reminderDate = this.calculateReminderDate(new Date(dueDate), 7);

    if (currentDate.getTime() === reminderDate.getTime()) {
      const sumAddOns = Number(this.getMembershipTotalAddOns(membership));

      const total = Number(totalAmount) + sumAddOns;

      const link = this.generateInvoiceLink(membership, total);

      const text = this.membershipEmailContent(membership, total, link);

      await this.queueService.addEmailJob({
        text,
        email,
        membershipType,
      });
    }
  }

  private getMembershipTotalAddOns(memship: Membership): number {
    return memship.addOnServices?.reduce(
      (sum, addOn) => sum + addOn?.monthlyAmount,
      0,
    );
  }

  private async handleExistingMemberReminder(
    membership: Membership,
    currentDate: Date,
  ): Promise<void> {
    const { email, membershipType, addOnServices } = membership;

    for (const addOn of addOnServices) {
      const addOnDueDate = new Date(addOn.dueDate);

      const isEqualMonth = addOnDueDate.getMonth() === currentDate.getMonth();

      const isEqualFullYear =
        addOnDueDate.getFullYear() === currentDate.getFullYear();

      if (isEqualFullYear && isEqualMonth) {
        const link = this.generateInvoiceLink(addOn, addOn.monthlyAmount);

        const text = this.addOnEmailContent(addOn, link);

        await this.queueService.addEmailJob({
          text,
          email,
          membershipType,
        });
      }
    }
  }

  private generateInvoiceLink(
    membership: Membership | AddOnService,
    amount: number,
  ): string {
    return `https://example.com/invoice/${membership.id}?totalAmount=${amount}`;
  }

  private membershipEmailContent(
    membership: Membership,
    totalAmount: number,
    link: string,
  ): string {
    return `
      Dear ${membership.firstName},
      Your ${membership.membershipType} membership is due soon.
      Total Amount: ${totalAmount}
      Invoice Link: ${link}
    `;
  }

  private addOnEmailContent(addOn: AddOnService, link: string): string {
    return `
      Your ${addOn.serviceName} service is due this month.
      Amount: ${addOn.monthlyAmount}.
      Invoice Link: ${link}
    `;
  }
}
