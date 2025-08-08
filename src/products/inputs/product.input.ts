import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Money } from 'generated/prisma';

export class OrderProductInput {
  @ApiProperty({ description: 'Product ID' })
  @IsUUID()
  product_id!: string;

  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  @IsPositive()
  quantity!: number;
}

export class SearchProductInput {
  @ApiProperty({
    description: 'Organization ID',
    example: '5b02de31-e911-4604-8175-c738d5183352',
  })
  @IsUUID()
  @IsNotEmpty()
  org_id: string;

  @ApiProperty({
    description: 'Product code',
    example: 'PT-150512',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Product name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Product avalaible',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  avalaible?: string;
}

export class CreateProductInput {
  @ApiProperty({
    description: 'Product code',
    example: 'PT-150512',
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Product name',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 10.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty({
    description: 'Money Type for de product',
    example: Money.BS,
    enum: Money,
  })
  @IsNotEmpty()
  @IsEnum(Money)
  money_type!: Money;
}

export class UpdateProductInput extends CreateProductInput {
  @ApiProperty({
    description: 'Product ID',
    example: '123456789',
  })
  @IsUUID()
  id!: string;
}
export class DeleteProductInput {
  @ApiProperty({
    description: 'Organization ID',
    example: '123456789',
  })
  @IsUUID()
  @IsNotEmpty()
  org_id: string;

  @ApiProperty({
    description: 'Product ID',
    example: '123456789',
  })
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
}
