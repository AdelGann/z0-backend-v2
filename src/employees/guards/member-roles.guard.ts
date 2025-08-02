import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { DbService } from 'src/common/db/db.service';
import { Roles } from 'generated/prisma';

@Injectable()
export class MemberRolesGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private dbService: DbService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (!can) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const org_id =
      request?.params?.org_id ||
      request?.body?.org_id ||
      request?.query?.org_id ||
      null;

    if (!user || !org_id) {
      throw new ForbiddenException('Invalid User or Organization');
    }

    const employee = await this.dbService.employees.findFirst({
      where: {
        user_id: user.id,
        org_id,
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
