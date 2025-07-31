import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DbService } from 'src/common/db/db.service';

@Module({
  providers: [ProductsService, DbService],
  controllers: [ProductsController],
})
export class ProductsModule {}
