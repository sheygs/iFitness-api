import { Test, TestingModule } from '@nestjs/testing';
import { BillingsService } from './billings.service';
import { MembershipsService } from '../memberships/memberships.service';
import { QueueModule } from '../shared/queues/queue.module';
import { InvoicesService } from '../invoices/invoices.service';
import { AddOnService, Membership, ServiceName } from '../shared';
import { MembershipType } from '../memberships/dtos';
import { BaseEntity } from 'typeorm';

class MockMembership extends BaseEntity implements Membership {
  id: number;
  firstName: string;
  lastName: string;
  membershipType: MembershipType;
  startDate: Date;
  dueDate: Date;
  totalAmount: number;
  email: string;
  isFirstMonth: boolean;
  addOnServices: AddOnService[];
  createdAt: Date;
  updatedAt: Date;
  invoices: any[];

  constructor(partial: Partial<Membership>) {
    super();
    Object.assign(this, partial);
  }
}

class MockAddOnService extends BaseEntity implements AddOnService {
  id: number;
  membershipID: number;
  serviceName: ServiceName;
  monthlyAmount: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  membership: Membership;

  constructor(partial: Partial<AddOnService>) {
    super();
    Object.assign(this, partial);
  }
}

describe('BillingsService', () => {
  let service: BillingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QueueModule],
      providers: [
        BillingsService,
        {
          provide: MembershipsService,
          useValue: {
            getMemberships: jest.fn().mockResolvedValue({
              result: [], // Mock empty result for getMemberships
            }),
            getCurrentDate: jest.fn().mockReturnValue(new Date()), // Mock getCurrentDate
          },
        },
        {
          provide: InvoicesService,
          useValue: {
            updateInvoice: jest.fn().mockResolvedValue(undefined), // Mock updateInvoice
          },
        },
      ],
    }).compile();

    service = module.get<BillingsService>(BillingsService);
  });

  it('should generate invoice link for membership', () => {
    const membership = new MockMembership({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      membershipType: MembershipType.MONTHLY_PREMIUM,
      startDate: new Date(),
      dueDate: new Date(),
      totalAmount: 100,
      email: 'john.doe@example.com',
      isFirstMonth: true,
      addOnServices: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      invoices: [],
    });
    const amount = 100;

    const invoiceLink = service['generateInvoiceLink'](membership, amount);

    expect(invoiceLink).toContain(
      `https://example.com/invoice/${membership.id}?totalAmount=${amount}`,
    );
  });

  it('should generate membership email content', () => {
    const membership = new MockMembership({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      membershipType: MembershipType.MONTHLY_PREMIUM,
      startDate: new Date(),
      dueDate: new Date(),
      totalAmount: 100,
      email: 'john.doe@example.com',
      isFirstMonth: true,
      addOnServices: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      invoices: [],
    });
    const amount = 100;
    const link = `https://example.com/invoice/${membership.id}?totalAmount=${amount}`;

    const emailContent = service['membershipEmailContent'](
      membership,
      amount,
      link,
    );

    expect(emailContent).toContain(`Dear ${membership.firstName}`);
    expect(emailContent).toContain(
      `Your ${membership.membershipType} membership is due soon.`,
    );
    expect(emailContent).toContain(`Total Amount: ${amount}`);
    expect(emailContent).toContain(`Invoice Link: ${link}`);
  });

  it('should generate add-on email content', () => {
    const addOn = new MockAddOnService({
      id: 1,
      membershipID: 1,
      serviceName: ServiceName.PERSONAL_TRAINING,
      monthlyAmount: 50,
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      membership: null,
    });
    const link = `https://example.com/invoice/${addOn.membershipID}?totalAmount=${addOn.monthlyAmount}`;

    const emailContent = service['addOnEmailContent'](addOn, link);

    expect(emailContent).toContain(
      `Your ${ServiceName.PERSONAL_TRAINING} service is due this month.`,
    );
    expect(emailContent).toContain(`Amount: ${addOn.monthlyAmount}`);
    expect(emailContent).toContain(`Invoice Link: ${link}`);
  });

  it('should calculate total add-ons for membership', () => {
    const membership = new MockMembership({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      membershipType: MembershipType.MONTHLY_PREMIUM,
      startDate: new Date(),
      dueDate: new Date(),
      totalAmount: 100,
      email: 'john.doe@example.com',
      isFirstMonth: true,
      addOnServices: [
        new MockAddOnService({
          id: 1,
          membershipID: 1,
          serviceName: ServiceName.PERSONAL_TRAINING,
          monthlyAmount: 50,
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        new MockAddOnService({
          id: 2,
          membershipID: 1,
          serviceName: ServiceName.TOWEL_RENTALS,
          monthlyAmount: 30,
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      invoices: [],
    });

    const totalAddOns = service['getMembershipTotalAddOns'](membership);

    expect(totalAddOns).toEqual(80); // Sum of monthly amounts of add-ons
  });

  it('should calculate reminder date correctly', () => {
    const dueDate = new Date('2024-07-01');
    const daysBefore = 7;

    const reminderDate = service['calculateReminderDate'](dueDate, daysBefore);

    expect(reminderDate.getFullYear()).toEqual(2024);
    expect(reminderDate.getMonth()).toEqual(5); // Months are zero-indexed
    expect(reminderDate.getDate()).toEqual(24);
    expect(reminderDate.getHours()).toEqual(0);
    expect(reminderDate.getMinutes()).toEqual(0);
    expect(reminderDate.getSeconds()).toEqual(0);
    expect(reminderDate.getMilliseconds()).toEqual(0);
  });
});
