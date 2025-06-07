import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './common/db/db.module';

@Module({
  imports: [UsersModule, DbModule],
})
export class AppModule { }
