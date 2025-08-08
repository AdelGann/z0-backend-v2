import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Roles } from 'generated/prisma';

export class EmployeeInput {
  @ApiProperty({
    description: 'Org ID',
    example: 'org_id',
  })
  @IsString()
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'doc_num of the employee',
    example: 'V - 7285932',
  })
  @IsString()
  @IsOptional()
  @MinLength(7)
  doc_num?: string;

  @ApiProperty({
    description: 'Role of the employee',
    example: 'ADMIN',
    enum: Roles,
  })
  @IsEnum(Roles)
  role!: Roles;
}

export class DeleteEmployeeInput {
  @ApiProperty({
    description: 'Org ID',
    example: 'org_id',
  })
  @IsString()
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'employee ID',
    example: 'employee_id',
  })
  @IsUUID()
  employee_id: string;
}
