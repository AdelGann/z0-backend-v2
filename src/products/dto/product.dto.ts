import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Money } from 'generated/prisma';

export class SearchProductDto {
  @ApiProperty({
    description: 'Organization ID',
    example: '123456789',
  })
  @IsUUID()
  @IsNotEmpty()
  org_id: string;

  @ApiProperty({
    description: 'Product code',
    example: 'PT-150512',
  })
  code?: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Product name',
  })
  name?: string;

  @ApiProperty({
    description: 'Product avalaible',
    example: true,
  })
  @IsBoolean()
  avalaible?: boolean;
}

export class CreateProductDto {
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
  @IsDecimal()
  price!: number;

  @ApiProperty({
    description: 'Money Type for de product',
    example: 'Bs',
    enum: Money,
  })
  @IsNotEmpty()
  @IsEnum([Money])
  money_type!: Money;
}
export class UpdateProductDto extends CreateProductDto {
  @ApiProperty({
    description: 'Product ID',
    example: '123456789',
  })
  @IsUUID()
  id!: string;
}
