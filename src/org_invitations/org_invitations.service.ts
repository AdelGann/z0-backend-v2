import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { InvitationState } from 'generated/prisma';
import { InvitationDto } from './dto/invitations.dto';

@Injectable()
export class OrgInvitationsService {
  constructor(private readonly dbService: DbService) {}

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
  async invite(org_id: string, user_id: string) {
    const org = await this.dbService.orgs.findFirst({
      where: {
        id: org_id,
      },
    });
    const user = await this.dbService.users.findFirst({
      where: {
        id: user_id,
      },
    });
    if (org === null) {
      throw new NotFoundException('Organization not found');
    }
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return this.dbService.org_invitations.create({
      data: {
        org_id,
        user_id,
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
  }
}
