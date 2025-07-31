import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DbService } from 'src/common/db/db.service';

@Module({
  providers: [EmployeesService, DbService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
