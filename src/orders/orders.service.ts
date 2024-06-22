import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../infra/orm/order.orm-entity';
import { OrderMapper } from '../infra/mappers/order.mapper';
import { BaseService } from 'src/infra/base.service';
import { Order } from './domain/orders.entity';
import { ORDER_PROVIDER_TOKEN } from './orders.providers';
import { Cart } from 'src/cart/domain/cart.entity';
import { OrderItem } from './domain/order-item.entity';

@Injectable()
export class OrdersService extends BaseService<Order, OrderOrmEntity> {
  constructor(
    @Inject(ORDER_PROVIDER_TOKEN)
    private readonly orderRepository: Repository<OrderOrmEntity>,
  ) {
    super(orderRepository, OrderMapper.toDomain, OrderMapper.toOrm);
  }

  async createOrderFromCart(cart: Cart): Promise<Order> {
    const orderItems = cart.items.map((item) => {
      return new OrderItem(
        item.product,
        item.quantity.value,
        item.product.price.value,
      );
    });

    const order = new Order(cart.totalAmount, orderItems, new Date());

    const savedOrder = await this.orderRepository.save(
      OrderMapper.toOrm(order),
    );

    return OrderMapper.toDomain(savedOrder);
  }
}
