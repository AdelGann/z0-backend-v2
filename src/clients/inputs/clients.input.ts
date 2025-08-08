import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateClientInput {
  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
  })
  @IsString()
  full_name!: string;

  @ApiProperty({
    description: 'Client email',
    example: 'john@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Client CI',
    example: '123456789',
  })
  @IsString()
  @MinLength(8)
  doc_num!: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+5698989898',
  })
  @IsPhoneNumber('VE')
  phone_number!: string;

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
  employee_id?: string;
}

export class UpdateClientInput extends OmitType(CreateClientInput, [
  'employee_id',
] as const) {
  @ApiProperty({ description: 'Client ID' })
  @IsUUID()
  id!: string;
}

export class SearchClientsInput {
  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Client email',
    example: 'john@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+5698989898',
    required: false,
  })
  @IsOptional()
  phone_number?: string;

  @ApiProperty({
    description: 'Client org id',
    example: 'e8925efc-62de-47a9-8537-7313363f5f71',
    required: true,
  })
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'Client employee id',
    example: '1512-1258-1258',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  employee_id?: string;
}

export class SearchClientsForEmployeesInput extends PickType(
  SearchClientsInput,
  ['employee_id', 'org_id'],
) {
  @ApiProperty({
    description: 'Client org id',
    example: 'e8925efc-62de-47a9-8537-7313363f5f71',
    required: true,
  })
  @IsUUID()
  org_id: string;

  @ApiProperty({
    description: 'Client employee id',
    example: '1512-1258-1258',
    required: true,
  })
  @IsUUID()
  employee_id: string;
}

export class DeleteClientInput {
  @ApiProperty({
    description: 'Client ID',
    example: '1512-1258-1258',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Client org id',
    example: 'e8925efc-62de-47a9-8537-7313363f5f71',
  })
  @IsUUID()
  org_id: string;

  @ApiProperty({
    description: 'Client employee id',
    example: '1512-1258-1258',
  })
  @IsUUID()
  employee_id?: string;
}
