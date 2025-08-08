import { MemberGuard } from '../guards/member.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

// Decorador para validar que el usuario pertenece a una organización
export function ValidateMember() {
  return applyDecorators(UseGuards(MemberGuard));
}
