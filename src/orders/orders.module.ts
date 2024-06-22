import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { orderProviders } from './orders.providers';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [...orderProviders, OrdersService],
  exports: [...orderProviders, OrdersService],
})
export class OrdersModule {}
