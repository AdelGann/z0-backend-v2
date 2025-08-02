import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsUUID } from 'class-validator';
import { InvitationState } from 'generated/prisma';

export class InvitationDto {
  @ApiProperty({
    description: 'Invitation ID',
    example: 'inv-id',
  })
  @IsUUID()
  invitation_id!: string;

  @ApiProperty({
    description: 'State of the invitation',
    example: 'ACCEPTED',
    enum: InvitationState,
  })
  @IsEnum(InvitationState)
  state!: InvitationState;
}

export class InviteDto {
  @ApiProperty({
    description:
      'Correo electrónico del usuario que será invitado a la organización',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  user_email: string;
}
