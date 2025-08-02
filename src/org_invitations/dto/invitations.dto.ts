import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { InvitationState } from 'generated/prisma';

export class InvitationDto {
  @ApiProperty({
    description: 'Organization id',
    example: 'org-id',
  })
  @IsUUID()
  org_id!: string;

  @ApiProperty({
    description: 'State of the invitation',
    example: 'ACCEPTED',
    enum: InvitationState,
  })
  @IsEnum(InvitationState)
  state!: InvitationState;
}
