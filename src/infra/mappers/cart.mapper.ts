import { CartOrmEntity } from '../orm/cart.orm-entity';
import { Cart } from '../../cart/domain/cart.entity';
import { CartItemMapper } from './cart-item.mapper';
import { UserMapper } from './user.mapper';

export class CartMapper {
  static toDomain(cartOrm: CartOrmEntity): Cart {
    if (!cartOrm) {
      throw new Error('Invalid CartOrmEntity: cartOrm is undefined');
    }

    return new Cart(
      cartOrm.items.map(CartItemMapper.toDomain),
      cartOrm.user ? UserMapper.toDomain(cartOrm.user) : null,
      cartOrm.id,
      cartOrm.createdAt,
      cartOrm.updatedAt,
      cartOrm.deletedAt,
      cartOrm.enabled,
    );
  }

  static toOrm(cart: Cart): CartOrmEntity {
    if (!cart) {
      throw new Error('Invalid Cart: cart is undefined');
    }

    const cartOrm = new CartOrmEntity();
    cartOrm.id = cart.id;
    cartOrm.items = cart.items.map(CartItemMapper.toOrm);
    cartOrm.user = cart.user ? UserMapper.toOrm(cart.user) : null;
    cartOrm.createdAt = cart.createdAt;
    cartOrm.updatedAt = cart.updatedAt;
    cartOrm.deletedAt = cart.deletedAt;
    cartOrm.enabled = cart.enabled;
    return cartOrm;
  }
}
