import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { AddOnService } from './addon-service';
import { MembershipType } from '../../../memberships/dtos';
import { Invoice } from './invoice';

@Entity({ name: 'memberships' })
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'firstName',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  firstName!: string;

  @Column({
    name: 'lastName',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  lastName!: string;

  @Column({
    name: 'membershipType',
    type: 'enum',
    enum: MembershipType,
    nullable: false,
  })
  membershipType!: MembershipType;

  @Column({
    name: 'startDate',
    type: 'date',
    nullable: false,
  })
  startDate!: Date;

  @Column({
    name: 'dueDate',
    type: 'date',
    nullable: false,
  })
  dueDate!: Date;

  @Column({
    name: 'totalAmount',
    type: 'decimal',
    nullable: false,
  })
  totalAmount!: number;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 70,
  })
  email: string;

  @Column({
    name: 'isFirstMonth',
    type: 'boolean',
    nullable: false,
  })
  isFirstMonth!: boolean;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt!: Date;

  @OneToMany(() => AddOnService, (addOnService) => addOnService.membership)
  addOnServices!: AddOnService[];

  @OneToMany(() => Invoice, (invoice) => invoice.membership)
  invoices!: Invoice[];
}
