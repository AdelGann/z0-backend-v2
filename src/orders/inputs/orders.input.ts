import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Money, PaymentStatus, PaymentType } from 'generated/prisma';
import { OrderProductInput } from 'src/products/inputs/product.input';

export class CreateOrderInput {
  @ApiProperty({
    description: 'Org ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'Client ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  client_id!: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  @IsOptional()
  employee_id?: string;

  @ApiProperty({
    description: 'Money Type',
    example: 'Bs',
    enum: Money,
  })
  @IsEnum(Money)
  money_type!: Money;

  @ApiProperty({
    description: 'Payment Type',
    example: 'credit',
    enum: PaymentType,
    default: PaymentType.credit,
  })
  @IsEnum(PaymentType)
  payment_type!: PaymentType;

  @ApiProperty({
    description: 'Total amount',
    example: 100,
    type: Number,
    minimum: 0,
  })
  @IsPositive()
  total_amount!: number;

  @ApiProperty({
    description: 'Lista de productos con cantidad',
    type: [OrderProductInput],
  })
  @ValidateNested({ each: true })
  @Type(() => OrderProductInput)
  order_items!: OrderProductInput[];
}

export class UpdateOrderStatusInput {
  @ApiProperty({
    description: 'Order ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  id!: string;

  @ApiProperty({
    description: 'Status',
    example: PaymentStatus.PAID,
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}

export class SearchOrdersInput {
  @ApiProperty({
    description: 'Org ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'Client ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  client_id?: string;

  @ApiProperty({
    description: 'Order ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  employee_id?: string;

  @ApiProperty({
    description: 'order status',
    example: PaymentStatus.PAID,
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
