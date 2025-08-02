import { Module } from '@nestjs/common';
import { OrgInvitationsController } from './org_invitations.controller';
import { OrgInvitationsService } from './org_invitations.service';
import { DbService } from '../common/db/db.service';

@Module({
  controllers: [OrgInvitationsController],
  providers: [OrgInvitationsService, DbService],
  exports: [OrgInvitationsService],
})
export class OrgInvitationsModule {}
