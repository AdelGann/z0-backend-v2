import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from 'generated/prisma';
import { RequireRoles } from 'src/auth/decorators';
import { MemberRolesGuard } from '../guards/member-roles.guard';

// Validar que el miembro de la organización tenga los roles requeridos
export function MemberRoles(...roles: Roles[]) {
  return applyDecorators(UseGuards(MemberRolesGuard), RequireRoles(...roles));
}
