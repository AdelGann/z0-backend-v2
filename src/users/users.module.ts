import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbService } from '../common/db/db.service';

@Module({
  providers: [UsersService, DbService],
  controllers: [UsersController]
})
export class UsersModule { }
