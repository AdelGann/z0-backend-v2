import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidateMember } from 'src/employees/decorators/member.decorator';
import {
  CreateIncomeDto,
  SearchParamsDto,
  UpdateIncomeStatusDto,
} from './dto/incomes.dto';
import { IncomesService } from './incomes.service';

@Auth()
@ApiTags('incomes')
@ValidateMember()
@ApiBearerAuth()
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

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
    return this.incomesService.getAll(params);
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
  post(@Query('org_id') org_id: string, @Body() createIncome: CreateIncomeDto) {
    return this.incomesService.create(org_id, createIncome);
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
  updateStatus(@Body() updateIncomeStatus: UpdateIncomeStatusDto) {
    return this.incomesService.updateStatus(updateIncomeStatus);
  }
}
