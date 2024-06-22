import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity';
import { OrderOrmEntity } from './order.orm-entity';
import { BaseEntity } from './base.orm-entity';

@Entity('order_items')
export class OrderItemOrmEntity extends BaseEntity {
  @ManyToOne(() => ProductOrmEntity, { eager: true })
  product: ProductOrmEntity;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items)
  order: OrderOrmEntity;
}
