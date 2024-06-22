import { Module } from '@nestjs/common';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { cartItemProviders } from './cart-item.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
  providers: [...cartItemProviders, CartItemService],
  exports: [...cartItemProviders, CartItemService],
})
export class CartItemModule {}
