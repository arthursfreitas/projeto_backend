import { Product } from './domain/product.entity';
import { ProductOrmEntity } from '../infra/orm/product.orm-entity';
import { ProductPrice } from './domain/vo/product-price.vo';
import { ProductName } from './domain/vo/product-name.vo';
import { CategoryMapper } from 'src/infra/mappers';

export class ProductsRepository {
  static toDomain(ormEntity: ProductOrmEntity): Product {
    return new Product(
      new ProductName(ormEntity.name),
      ormEntity.description,
      CategoryMapper.toDomain(ormEntity.category),
      new ProductPrice(ormEntity.price),
      ormEntity.id,
    );
  }

  static toOrm(domainEntity: Product): ProductOrmEntity {
    const ormEntity = new ProductOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name.value;
    ormEntity.description = domainEntity.description;
    ormEntity.category = CategoryMapper.toOrm(domainEntity.category);
    ormEntity.price = domainEntity.price.value;
    return ormEntity;
  }
}
