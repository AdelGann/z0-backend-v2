import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { RequireRoles } from '../metadata/roles.metadata';
import { Roles } from 'generated/prisma';

export function AuthRoles(...roles: Roles[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    RequireRoles(...roles),
  );
}
