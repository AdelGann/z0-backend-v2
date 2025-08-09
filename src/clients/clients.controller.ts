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
  ClientFeedBackInput,
  CreateClientInput,
  DeleteClientInput,
  SearchClientFeedBackInput,
  SearchClientsForEmployeesInput,
  SearchClientsInput,
  UpdateClientInput,
} from './inputs/clients.input';
import { user_response } from 'src/users/interfaces/user.interface';

@Auth()
@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ValidateMember()
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
  getAll(@Query() params: SearchClientsInput) {
    return this.clientsService.getAll(params);
  }

  @Get('/history')
  @ApiOperation({
    description: 'Find client history',
    summary: 'Find client history',
  })
  @ApiResponse({
    status: 200,
    description: 'Find client history',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  getClientHistory(@Query() params: SearchClientFeedBackInput) {
    return this.clientsService.getClientHistory(params);
  }

  @Post('/feedback')
  @ValidateMember()
  @ApiOperation({
    description: 'Create client feedback',
    summary: 'Create client feedback',
  })
  @ApiResponse({
    status: 200,
    description: 'Client feedback created',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  createClientFeedback(@Body() data: ClientFeedBackInput) {
    return this.clientsService.createClientFeedback(data.client_id, data);
  }

  @Get('/by-employee')
  @ValidateMember()
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
    @Query() params: SearchClientsForEmployeesInput,
  ) {
    return this.clientsService.getAllByEmployee(user.id, params);
  }

  @Post()
  @ValidateMember()
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
  @ValidateMember()
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
  @ValidateMember()
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
  delete(@Query() params: DeleteClientInput) {
    return this.clientsService.delete(params);
  }
}
