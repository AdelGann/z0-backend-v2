import { Module } from '@nestjs/common';
import { OrgInvitationsController } from './org_invitations.controller';
import { OrgInvitationsService } from './org_invitations.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { DbModule } from 'src/common/db/db.module';

@Module({
  controllers: [OrgInvitationsController],
  providers: [OrgInvitationsService],
  imports: [DbModule, EmployeesModule],
  exports: [OrgInvitationsService],
})
export class OrgInvitationsModule {}
