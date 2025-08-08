import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class MemberGuard extends AuthGuard('jwt') {
  constructor(private dbService: DbService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (!can) {
      return false;
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
      },
    });

    if (!employee) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
