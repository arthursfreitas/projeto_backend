import { ProductOrmEntity } from '../orm/product.orm-entity';
import { Product } from '../../products/domain/product.entity';
import { ProductName } from '../../products/domain/vo/product-name.vo';
import { ProductPrice } from '../../products/domain/vo/product-price.vo';
import { CategoryMapper } from './category.mapper';

export class ProductMapper {
  static toDomain(productOrm: ProductOrmEntity): Product {
    return new Product(
      new ProductName(productOrm.name),
      productOrm.description,
      CategoryMapper.toDomain(productOrm.category),
      new ProductPrice(productOrm.price),
      productOrm.id,
    );
  }

  static toOrm(product: Product): ProductOrmEntity {
    const productOrm = new ProductOrmEntity();

    productOrm.id = product.id;
    productOrm.name = product.name.value;
    productOrm.description = product.description;
    productOrm.price = product.price.value;

    if (product.category) {
      productOrm.category = CategoryMapper.toOrm(product.category);
    }

    return productOrm;
  }
}
