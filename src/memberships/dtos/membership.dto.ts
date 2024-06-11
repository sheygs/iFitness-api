import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MembershipType {
  ANNUAL_BASIC = 'Annual Basic',
  MONTHLY_PREMIUM = 'Monthly Premium',
  ANNUAL_PREMIUM = 'Annual Premium',
  MONTHLY_BASIC = 'Monthly Basic',
}

export class CreateMembershipDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'First Name' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last Name' })
  lastName: string;

  @IsEnum(MembershipType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Membership Type',
    enum: MembershipType,
    enumName: 'MembershipType',
  })
  membershipType: MembershipType;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Start Date' })
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Due Date' })
  dueDate: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'Total Amount' })
  totalAmount: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ description: 'isFirstMonth' })
  isFirstMonth: boolean;
}

export class GetMembershipDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Page Number', default: 1 })
  page: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Size Per Page', default: 10 })
  size: string;
}
