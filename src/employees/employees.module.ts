import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DbService } from '../common/db/db.service';

@Module({
  providers: [EmployeesService, DbService],
  controllers: [EmployeesController],
  exports: [EmployeesService],
})
export class EmployeesModule {}
