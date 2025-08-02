import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles, users } from 'generated/prisma';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { OrgInvitationsService } from './org_invitations.service';
import { Post } from '@nestjs/common';
import { MemberRoles } from 'src/employees/decorators/role.decorator';
import { InvitationDto } from './dto/invitations.dto';

@ApiTags('org-invitations')
@ApiBearerAuth()
@Auth()
@Controller('org-invitations')
export class OrgInvitationsController {
  constructor(private readonly invitationsService: OrgInvitationsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all org invitations',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all org invitations',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  getAll(@CurrentUser() user: users) {
    return this.invitationsService.getAll(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'invite a user to an organization' })
  @ApiResponse({
    status: 201,
    description: 'invitation created successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'org not found',
  })
  @ApiResponse({
    status: 404,
    description: 'user not found',
  })
  @MemberRoles(Roles.ADMIN)
  invite(@Query('org_id') org_id: string, @Body() user_email: string) {
    return this.invitationsService.invite(org_id, user_email);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'invitation state updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'invitation not found',
  })
  @ApiResponse({
    status: 401,
    description: 'you are not the owner of this invitation',
  })
  @ApiResponse({
    status: 404,
    description: 'user not found',
  })
  reply(@CurrentUser() user: users, @Body() invitation: InvitationDto) {
    return this.invitationsService.reply(user.id, invitation);
  }
}
