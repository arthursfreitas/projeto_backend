import { CartItemOrmEntity } from 'src/infra/orm';
import { ProductsRepository } from 'src/products/products.repository';
import { CartItem } from './domain/cart-item.entity';
import { Quantity } from './domain/vo/quantity.vo';

export class CartItemRepository {
  static toDomain(ormEntity: CartItemOrmEntity): CartItem {
    return new CartItem(
      ProductsRepository.toDomain(ormEntity.product),
      new Quantity(ormEntity.quantity),
      ormEntity.id,
    );
  }

  static toOrm(domainEntity: CartItem): CartItemOrmEntity {
    const ormEntity = new CartItemOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.product = ProductsRepository.toOrm(domainEntity.product);
    ormEntity.quantity = domainEntity.quantity.value;
    return ormEntity;
  }
}
