import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Membership } from './membership';

enum ServiceName {
  PERSONAL_TRAINING = 'Personal Training',
  TOWEL_RENTALS = 'Towel Rentals',
}

@Entity({ name: 'addon-services' })
export class AddOnService extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    name: 'membershipID',
    type: 'number',
    nullable: false,
  })
  membershipID!: number;

  @Column({
    name: 'serviceName',
    type: 'enum',
    enum: ServiceName,
    nullable: false,
  })
  serviceName!: ServiceName;

  @Column({
    name: 'monthlyAmount',
    type: 'decimal',
    nullable: false,
  })
  monthlyAmount!: number;

  @Column({
    name: 'dueDate',
    type: 'date',
    nullable: false,
  })
  dueDate!: Date;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt!: Date;

  @ManyToOne(() => Membership, (membership) => membership.addOnServices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'membershipID' })
  membership: Membership;
}
