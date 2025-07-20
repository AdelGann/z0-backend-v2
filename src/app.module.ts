import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './common/db/db.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './config/config.service';

@Module({
  imports: [configModule, UsersModule, DbModule, AuthModule],
})
export class AppModule {}
