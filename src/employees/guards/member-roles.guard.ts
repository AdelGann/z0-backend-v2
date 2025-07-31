import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DbService } from 'src/common/db/db.service';
import { Roles } from 'generated/prisma';

@Injectable()
export class MemberRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dbService: DbService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orgId = request.params.organizationId || request.body.organizationId;

    if (!user || !orgId) {
      throw new ForbiddenException('Invalid User or Organization');
    }

    const employee = await this.dbService.employees.findFirst({
      where: {
        user_id: user.id,
        org_id: orgId,
        role: { in: requiredRoles },
      },
    });

    if (!employee) {
      throw new ForbiddenException(
        'You do not have the required roles to access this resource',
      );
    }

    return true;
  }
}
