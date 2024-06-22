import { Module } from '@nestjs/common';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { cartProviders } from './cart.providers';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    OrdersModule,
    ProductsModule,
    CartItemModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [...cartProviders, CartService],
  exports: [...cartProviders, CartService],
})
export class CartModule {}
