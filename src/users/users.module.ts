import {  Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrgModule } from '../org/org.module';
import { DbModule } from '../common/db/db.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [OrgModule, DbModule],
})
export class UsersModule {}
