import { Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { Auth, CurrentUser } from '../auth/decorators';
import { ValidateMember } from './decorators/member.decorator';
import { EmployeeInput } from './inputs/employees.input'; 
import { Roles, users } from 'generated/prisma';
import { MemberRoles } from './decorators/role.decorator';

@Auth()
@ValidateMember()
@ApiTags('employees')
@Controller('employees')
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly memberService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees' })
  @ApiResponse({ status: 404, description: 'Employees not founded' })
  @ApiResponse({ status: 401, description: 'Forbbiden' })
  getAll(@Query('org_id') org_id: string) {
    return this.memberService.getAll(org_id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a employee' })
  @ApiResponse({ status: 200, description: 'Employee successfully updated' })
  @ApiResponse({ status: 404, description: 'Org not founded' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 401, description: 'Forbbiden' })
  updateMember(@CurrentUser() user: users, employee: EmployeeInput) {
    return this.memberService.update(user.id, employee);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a employee' })
  @ApiResponse({ status: 200, description: 'Employee successfully deleted' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 401, description: 'Forbbiden' })
  @MemberRoles(Roles.ADMIN)
  removeMember(
    @CurrentUser() user: users,
    @Query() { user_id, org_id }: { user_id: string; org_id: string },
  ) {
    return this.memberService.remove(org_id, user_id, user.id);
  }
}
