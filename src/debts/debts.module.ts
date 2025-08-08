import { Module } from '@nestjs/common';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { DbModule } from 'src/common/db/db.module';

@Module({
  controllers: [DebtsController],
  providers: [DebtsService],
  imports: [DbModule, EmployeesModule],
})
export class DebtsModule {}
