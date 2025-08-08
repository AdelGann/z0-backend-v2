import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Money, PaymentStatus, PaymentType } from 'generated/prisma';

export class SearchParamsInput {
  @ApiProperty({
    description: 'Employee id',
    type: String,
    required: false,
    example: '1512-1258-1258',
  })
  @IsUUID()
  @IsOptional()
  employee_id?: string;

  @ApiProperty({
    description: 'org id',
    type: String,
    required: false,
    example: '1512-1258-1258',
  })
  @IsUUID()
  @IsOptional()
  org_id?: string;
}

export class CreateDebtInput {
  @ApiProperty({
    description: 'Debt type name',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  debt_type!: string;

  @ApiProperty({
    description: 'Payment type',
    enum: PaymentType,
    required: true,
    default: PaymentType.credit,
    example: PaymentType.credit,
  })
  @IsNotEmpty()
  @IsEnum(PaymentType)
  payment_type!: PaymentType;

  @ApiProperty({
    description: 'Money type',
    enum: Money,
    required: true,
    default: Money.Bs,
    example: Money.Bs,
  })
  @IsNotEmpty()
  @IsEnum(Money)
  money_type!: Money;

  @ApiProperty({
    description: 'Amount',
    default: 0,
    required: true,
    example: 100,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({
    description: 'Employee id',
    type: String,
    required: false,
    example: '1512-1258-1258',
  })
  @IsUUID()
  @IsOptional()
  employee_id?: string;
}

export class UpdateDebtStatusInput {
  @ApiProperty({
    description: 'debt id',
    required: true,
    example: '1512-1258-1258',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'Payment status',
    default: PaymentStatus.PAID,
    enum: PaymentStatus,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}
