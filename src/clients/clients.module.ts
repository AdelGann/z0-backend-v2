import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DbModule } from 'src/common/db/db.module';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [DbModule],
})
export class ClientsModule {}
