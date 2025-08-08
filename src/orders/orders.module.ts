import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DbModule } from 'src/common/db/db.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [DbModule],
})
export class OrdersModule {}
