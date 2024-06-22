import { OrderItemOrmEntity } from '../orm/order-item.orm-entity';
import { OrderItem } from '../../orders/domain/order-item.entity';
import { ProductMapper } from './product.mapper';

export class OrderItemMapper {
  static toDomain(orderItemOrm: OrderItemOrmEntity): OrderItem {
    return new OrderItem(
      ProductMapper.toDomain(orderItemOrm.product),
      orderItemOrm.quantity,
      orderItemOrm.price,
      orderItemOrm.id,
    );
  }

  static toOrm(orderItem: OrderItem): OrderItemOrmEntity {
    const orderItemOrm = new OrderItemOrmEntity();
    orderItemOrm.id = orderItem.id;
    orderItemOrm.product = ProductMapper.toOrm(orderItem.product);
    orderItemOrm.quantity = orderItem.quantity;
    orderItemOrm.price = orderItem.price;
    return orderItemOrm;
  }
}
