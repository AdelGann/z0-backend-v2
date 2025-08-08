import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, CurrentUser } from 'src/auth/decorators';
import { ValidateMember } from 'src/employees/decorators/member.decorator';
import { MemberRoles } from 'src/employees/decorators/role.decorator';
import { ClientsService } from './clients.service';
import { Roles } from 'generated/prisma';
import {
  CreateClientInput,
  DeleteClientInput,
  SearchClientsForEmployeesInput,
  SearchClientsInput,
  UpdateClientInput,
} from './inputs/clients.input';
import { user_response } from 'src/users/interfaces/user.interface';

@Auth()
@ValidateMember()
@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @MemberRoles(Roles.ADMIN)
  @ApiOperation({
    summary: 'Find all clients for admin',
    description: 'Find all clients for admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Find all Clients for admin',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  getAll(@Query('params') params: SearchClientsInput) {
    return this.clientsService.getAll(params);
  }

  @Get('/by-employee')
  @ApiOperation({
    description: 'Find all clients for employee',
    summary: 'Find all clients for employee',
  })
  @ApiResponse({
    status: 200,
    description: 'Find all clients for employee',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  getAllByEmployee(
    @CurrentUser() user: user_response,
    @Query('params') params: SearchClientsForEmployeesInput,
  ) {
    return this.clientsService.getAllByEmployee(user.id, params);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  create(@Body() data: CreateClientInput) {
    return this.clientsService.create(data);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({
    status: 200,
    description: 'Client updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  update(@Body() data: UpdateClientInput) {
    return this.clientsService.update(data);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({
    status: 200,
    description: 'Client deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  delete(@Query('params') params: DeleteClientInput) {
    return this.clientsService.delete(params);
  }
}
