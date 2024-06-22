import { Module } from '@nestjs/common';
import { productProviders } from './products.providers';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ProductsController } from './products.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [DatabaseModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [...productProviders, ProductsService],
  exports: [...productProviders, ProductsService],
})
export class ProductsModule {}
