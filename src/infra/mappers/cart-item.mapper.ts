import { CartItem } from 'src/cart-item/domain/cart-item.entity';
import { CartItemOrmEntity } from '../orm/cart-item.orm-entity';
import { ProductMapper } from './product.mapper';
import { Quantity } from 'src/cart-item/domain/vo/quantity.vo';

export class CartItemMapper {
  static toDomain(cartItemOrm: CartItemOrmEntity): CartItem {
    return new CartItem(
      ProductMapper.toDomain(cartItemOrm.product),
      new Quantity(cartItemOrm.quantity),
      cartItemOrm.id,
    );
  }

  static toOrm(cartItem: CartItem): CartItemOrmEntity {
    const cartItemOrm = new CartItemOrmEntity();
    cartItemOrm.id = cartItem.id;
    cartItemOrm.product = ProductMapper.toOrm(cartItem.product);
    cartItemOrm.quantity = cartItem.quantity.value;
    return cartItemOrm;
  }
}
