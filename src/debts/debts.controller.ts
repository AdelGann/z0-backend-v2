import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidateMember } from 'src/employees/decorators/member.decorator';
import { DebtsService } from './debts.service';
import {
  CreateDebtDto,
  SearchParamsDto,
  UpdateDebtStatusDto,
} from './dto/debts.dto';

@Auth()
@ApiTags('debts')
@ValidateMember()
@ApiBearerAuth()
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all incomes',
    description: 'Get all incomes',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all incomes',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  getAll(@Query() params: SearchParamsDto) {
    return this.debtsService.getAll(params);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new income',
    description: 'Create a new income',
  })
  @ApiResponse({
    status: 201,
    description: 'Income successfully created',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  post(@Query('org_id') org_id: string, @Body() createDebt: CreateDebtDto) {
    return this.debtsService.create(org_id, createDebt);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update income status',
    description: 'Update income status',
  })
  @ApiResponse({
    status: 200,
    description: 'update income status',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  updateStatus(@Body() updateDebtsStatus: UpdateDebtStatusDto) {
    return this.debtsService.updateStatus(updateDebtsStatus);
  }
}
