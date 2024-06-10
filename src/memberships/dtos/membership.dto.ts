import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export enum MembershipType {
  ANNUAL_BASIC = 'Annual Basic',
  MONTHLY_PREMIUM = 'Monthly Premium',
}

export class CreateMembershipDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(MembershipType)
  @IsNotEmpty()
  membershipType: MembershipType;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  totalAmount: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isFirstMonth: boolean;
}

export class GetMembershipDTO {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  size: string;
}
