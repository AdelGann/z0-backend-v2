import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

// METODO Para actualizar y crear organizaciones

export class CreateOrgDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Organization name',
  })
  @IsString()
  @MinLength(6)
  name!: string;
}

export class UpdateOrgDto extends CreateOrgDto {
  @ApiProperty({
    description: 'Organization ID',
    example: 'org_id',
  })
  @IsString()
  id!: string;
}

export class SelectOrgDto extends UpdateOrgDto {}
