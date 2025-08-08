import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateClientInput {
  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Client email',
    example: 'john@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+5698989898',
  })
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    description: 'Client org id',
    example: '1512-1258-1258',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  org_id!: string;

  @ApiProperty({
    description: 'Client employee id',
    example: '1512-1258-1258',
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  employee_id!: string;
}

export class UpdateClientInput extends CreateClientInput {
  @ApiProperty({
    description: 'Client ID',
  })
  @IsUUID()
  id!: string;
}

export class SearchClientsInput {
  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Client email',
    example: 'john@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+5698989898',
  })
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    description: 'Client org id',
    example: '1512-1258-1258',
  })
  @IsString()
  org_id?: string;

  @ApiProperty({
    description: 'Client employee id',
    example: '1512-1258-1258',
  })
  @IsString()
  employee_id?: string;
}
