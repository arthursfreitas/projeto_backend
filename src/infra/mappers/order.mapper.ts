import { Order } from 'src/orders/domain/orders.entity';
import { OrderOrmEntity } from '../orm/order.orm-entity';
import { OrderItemMapper } from './order-item.mapper';

export class OrderMapper {
  static toDomain(orderOrm: OrderOrmEntity): Order {
    return new Order(
      orderOrm.totalAmount,
      orderOrm.items.map(OrderItemMapper.toDomain),
      orderOrm.createdAt,
      orderOrm.id,
    );
  }

  static toOrm(order: Order): OrderOrmEntity {
    const orderOrm = new OrderOrmEntity();
    orderOrm.id = order.id;
    orderOrm.totalAmount = order.totalAmount;
    orderOrm.createdAt = order.createdAt;
    orderOrm.items = order.items.map(OrderItemMapper.toOrm);
    return orderOrm;
  }
}
