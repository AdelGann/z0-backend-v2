import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './common/db/db.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './config/config.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { OrgModule } from './org/org.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [configModule, UsersModule, DbModule, AuthModule, ProductsModule, OrgModule, EmployeesModule],
  controllers: [ProductsController],
})
export class AppModule {}
