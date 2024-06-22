import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartOrmEntity } from '../infra/orm/cart.orm-entity';
import { Cart } from './domain/cart.entity';
import { CartMapper } from '../infra/mappers/cart.mapper';
import { ProductsService } from '../products/products.service';
import { BaseService } from 'src/infra/base.service';
import { OrdersService } from 'src/orders/orders.service';
import { Quantity } from 'src/cart-item/domain/vo/quantity.vo';
import { Order } from 'src/orders/domain/orders.entity';
import { CART_PROVIDER_TOKEN } from './cart.providers';
import { OrderItem } from 'src/orders/domain/order-item.entity';
import { CartItem } from 'src/cart-item/domain/cart-item.entity';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/domain/user.entity';
import { Username } from 'src/users/domain/vo/username.vo';
import { Email } from 'src/users/domain/vo/email.vo';
import { Password } from 'src/users/domain/vo/password.vo';
import { UsersService } from 'src/users/users.service';
import { ApiCart, CartPresentation } from './cart.presentation';
import { UserMapper } from 'src/infra/mappers/user.mapper';

@Injectable()
export class CartService extends BaseService<Cart, CartOrmEntity> {
  constructor(
    @Inject(CART_PROVIDER_TOKEN)
    private readonly cartRepository: Repository<CartOrmEntity>,
    private readonly productService: ProductsService,
    private readonly orderService: OrdersService,
    private readonly usersService: UsersService,
  ) {
    super(cartRepository, CartMapper.toDomain, CartMapper.toOrm);
  }

  async addToCart(
    user: UserDto,
    productId: string,
    quantity: number,
  ): Promise<ApiCart> {
    const cart = await this.getOrCreateCart(user);
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    const cartItem = new CartItem(product, new Quantity(quantity));
    cart.addItem(cartItem);

    await this.update(cart.id, cart);
    return CartPresentation.toApi(cart);
  }

  async removeFromCart(
    user: UserDto,
    productId: string,
    quantity: number,
  ): Promise<ApiCart> {
    const cart = await this.getOrCreateCart(user);
    cart.removeItem(productId, quantity);

    await this.update(cart.id, cart);
    return CartPresentation.toApi(cart);
  }

  async viewCart(user: UserDto): Promise<ApiCart | { message: string }> {
    const cart = await this.findCartByUser(user);
    if (!cart) return { message: 'No items in the cart' };
    return CartPresentation.toApi(cart);
  }

  async checkout(user: UserDto): Promise<void> {
    const cart = await this.getOrCreateCart(user);
    const totalAmount = cart.totalAmount;
    const orderItems = cart.items.map((item) => {
      return new OrderItem(
        item.product,
        item.quantity.value,
        item.product.price.value,
      );
    });

    const order = new Order(totalAmount, orderItems, new Date());
    await this.orderService.create(order);

    cart.disable();
    await this.update(cart.id, cart);
  }

  private async findCartByUser(user: UserDto): Promise<Cart | null> {
    const cartOrm = await this.cartRepository.findOne({
      where: { userId: user.userId },
      relations: this.getRelations(),
    });

    return cartOrm ? CartMapper.toDomain(cartOrm) : null;
  }

  private async getOrCreateCart(user: UserDto): Promise<Cart> {
    let cart = await this.findCartByUser(user);
    if (!cart) {
      const userInstance = new User(
        new Username(user.username),
        new Email(user.email),
        new Password(user.password),
        user.userId,
        user.carts || [],
      );
      cart = new Cart([], userInstance);
      const cartOrm = await this.cartRepository.save(CartMapper.toOrm(cart));
      const userFound = await this.usersService.findOne(cartOrm.userId);
      cartOrm.user = UserMapper.toOrm(userFound);
      cart = CartMapper.toDomain(cartOrm);
    }
    return cart;
  }

  protected getRelations(): string[] {
    return ['items', 'items.product', 'user', 'items.product.category'];
  }
}
