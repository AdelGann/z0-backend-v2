import {
  Controller,
  Get,
  //Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateUserInput,
  UpdateUserInput,
  UpdatePasswordInput,
} from './inputs/user.input';
import { UsersService } from './users.service';
import { user_response } from 'src/users/interfaces/user.interface';
import { Auth, AuthRoles, CurrentUser } from '../auth/decorators';
import { token_payload } from '../auth/interfaces/Token_Payload.interface';
import { Roles } from 'generated/prisma';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /*
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserInput,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserInput: CreateUserInput) {
    return this.service.create(createUserInput);
  }
  */

  @Get()
  @AuthRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [CreateUserInput],
  })
  async findAll(): Promise<user_response[]> {
    return await this.service.getAll();
  }

  @Get('by-id')
  @Auth()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: CreateUserInput,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(
    @CurrentUser() user: token_payload,
  ): Promise<user_response | null> {
    return await this.service.getById(user.sub);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UpdateUserInput,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @CurrentUser() user: token_payload,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    return this.service.update(user.sub, updateUserInput);
  }

  @Patch('restore-password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'Password successfully updated',
    type: UpdatePasswordInput,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  updatePassword(
    @CurrentUser() user: token_payload,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.service.updatePassword(user.sub, updatePasswordInput);
  }

  @Delete('delete-account')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@CurrentUser() user: token_payload) {
    return this.service.delete(user.sub);
  }

  @Delete('delete-account/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @AuthRoles(Roles.ADMIN)
  deleteById(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
