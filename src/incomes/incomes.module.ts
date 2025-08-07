import { Module } from '@nestjs/common';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { DbModule } from 'src/common/db/db.module';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports: [DbModule, EmployeesModule],
})
export class IncomesModule {}
