import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, AuthRoles, CurrentUser } from '../auth/decorators';
import { OrgService } from './org.service';
import { CreateOrgInput, UpdateOrgInput } from './inputs/org.input';
import { Roles, users } from 'generated/prisma';
import { ValidateMember } from '../employees/decorators/member.decorator';
import { MemberRoles } from '../employees/decorators/role.decorator';

@Auth()
@ApiTags('org')
@ApiBearerAuth()
@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orgs' })
  @ApiResponse({})
  @AuthRoles(Roles.ADMIN)
  getAll() {
    return this.orgService.getAll();
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orgs',
    description: 'this will only work if a user works in the search org.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all orgs',
  })
  @ValidateMember()
  @ApiResponse({ status: 404, description: 'Org not founded' })
  @ApiResponse({ status: 401, description: 'Forbbiden' })
  getOrg(@Query() org_id: string) {
    return this.orgService.getById(org_id);
  }

  @Get('select-orgs-by-user')
  @ApiOperation({ summary: 'Get all orgs by users' })
  getByUserID(@CurrentUser() user: users) {
    return this.orgService.getAllOrgByUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new org' })
  @ApiResponse({
    status: 201,
    description: 'Org successfully created',
    type: CreateOrgInput,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createOrg: CreateOrgInput, @CurrentUser() user: users) {
    return this.orgService.create(createOrg, user.id);
  }

  @Patch()
  @MemberRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Update a org' })
  @ApiResponse({
    status: 200,
    description: 'Org successfully updated',
    type: UpdateOrgInput,
  })
  @ApiResponse({ status: 404, description: 'Org not found' })
  update(@Body() updateOrg: UpdateOrgInput) {
    return this.orgService.update(updateOrg);
  }

  // TODO: Realizar
  delete() {}
}
