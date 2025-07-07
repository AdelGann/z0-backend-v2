import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './common/db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DbModule, AuthModule,],
})
export class AppModule { }
