import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';
import { EmployeesModule } from '../employees/employees.module';
import { DbModule } from '../common/db/db.module';

@Module({
  providers: [OrgService],
  controllers: [OrgController],
  exports: [OrgService],
  imports: [DbModule, EmployeesModule],
})
export class OrgModule {}
