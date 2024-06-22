import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './infra/database/database.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    AuthModule,
    CartItemModule,
    OrdersModule,
    UsersModule,
  ],
})
export class AppModule {}
