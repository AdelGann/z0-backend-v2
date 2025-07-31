import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';
import { DbService } from 'src/common/db/db.service';

@Module({
  providers: [OrgService, DbService],
  controllers: [OrgController],
  exports: [OrgService],
})
export class OrgModule {}
