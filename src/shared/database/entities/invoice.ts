import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Membership } from './membership';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'membershipID',
    type: 'number',
    nullable: false,
  })
  membershipID!: number;

  @Column({
    name: 'invoiceDateTime',
    type: 'timestamp',
    nullable: true,
  })
  invoiceDateTime!: Date;

  @Column({
    name: 'totalAmount',
    type: 'decimal',
    nullable: true,
  })
  totalAmount!: number;

  @Column({
    name: 'invoiceUID',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  invoiceUID!: string;

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

  @ManyToOne(() => Membership, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'membershipID' })
  membership: Membership;
}
