import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MembershipsService } from '../memberships/memberships.service';
import { AddOnService, Membership } from '../shared';

@Injectable()
export class BillingsService {
  constructor(private membershipService: MembershipsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
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
    const reminderDate = this.calculateReminderDate(
      new Date(membership.dueDate),
      7,
    );

    if (currentDate.getTime() === reminderDate.getTime()) {
      const totalAddOns = Number(this.getMembershipAddOnsCost(membership));

      const sum = Number(membership.totalAmount) + totalAddOns;

      // console.log({ totalAddOns, type: typeof totalAddOns, sum });

      const link = this.generateInvoiceLink(membership, sum);

      const text = this.membershipEmailContent(membership, sum, link);

      console.log({ text, link });

      // send mail here 🔥
    }
  }

  private getMembershipAddOnsCost(membership: Membership): number {
    return membership.addOnServices?.reduce(
      (sum, addOn) => sum + addOn?.monthlyAmount,
      0,
    );
  }

  private async handleExistingMemberReminder(
    membership: Membership,
    currentDate: Date,
  ): Promise<void> {
    for (const addOn of membership.addOnServices) {
      const addOnDueDate = new Date(addOn.dueDate);

      const isEqualMonth = addOnDueDate.getMonth() === currentDate.getMonth();

      const isEqualFullYear =
        addOnDueDate.getFullYear() === currentDate.getFullYear();

      if (isEqualFullYear && isEqualMonth) {
        const link = this.generateInvoiceLink(addOn, addOn.monthlyAmount);

        const text = this.addOnEmailContent(addOn, link);

        console.log({ text, link });

        // send mail here 🔥
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
