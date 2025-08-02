import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { InvitationState, Roles } from 'generated/prisma';
import { InvitationDto } from './dto/invitations.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class OrgInvitationsService {
  constructor(
    private readonly dbService: DbService,
    private readonly employeesService: EmployeesService,
  ) {}

  async getAll(user_id: string) {
    const user = await this.dbService.users.findFirst({
      where: { id: user_id },
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return this.dbService.org_invitations.findMany({
      where: {
        user_id: user.id,
      },
    });
  }
  async invite(org_id: string, user_email: string) {
    const org = await this.dbService.orgs.findFirst({
      where: {
        id: org_id,
      },
    });
    const user = await this.dbService.users.findFirst({
      where: {
        email: user_email,
      },
    });
    if (org === null) {
      throw new NotFoundException('Organization not found');
    }
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    const existingInvitation = await this.dbService.org_invitations.findFirst({
      where: {
        org_id,
        user_id: user.id,
        state: InvitationState.PENDING,
      },
    });
    if (existingInvitation) {
      throw new ConflictException(
        'Pending invitation already exists for this user',
      );
    }
    return this.dbService.org_invitations.create({
      data: {
        org_id,
        user_id: user.id,
        state: InvitationState.PENDING,
      },
    });
  }

  // NOTE: Servicio para aceptar o rechazar
  async reply(user_id: string, invitation: InvitationDto) {
    const user = await this.dbService.users.findFirst({
      where: { id: user_id },
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    const org_inv = await this.dbService.org_invitations.findFirst({
      where: {
        id: invitation.invitation_id,
        state: InvitationState.PENDING,
      },
    });
    if (org_inv === null) {
      throw new NotFoundException('Invitation not found');
    }
    if (org_inv?.user_id !== user.id) {
      throw new ForbiddenException('You are not the owner of this invitation');
    }
    const existingEmployee = await this.dbService.employees.findFirst({
      where: {
        user_id,
        org_id: org_inv.org_id,
      },
    });
    if (existingEmployee) {
      throw new ConflictException(
        'User is already an employee of this organization',
      );
    }
    const inv_updated = await this.dbService.org_invitations.update({
      where: { id: invitation.invitation_id },
      data: {
        state: invitation.state,
        update_at: new Date(),
      },
    });
    if (inv_updated.state === InvitationState.ACCEPTED) {
      await this.employeesService.create(user.id, {
        org_id: org_inv.org_id,
        role: Roles.USER,
        doc_num: undefined,
      });
    } else {
      return 'User rejected the invitation';
    }
  }
}
