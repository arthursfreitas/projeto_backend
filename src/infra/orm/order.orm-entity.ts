import { Entity, Column, OneToMany } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';
import { BaseEntity } from './base.orm-entity';

@Entity('orders')
export class OrderOrmEntity extends BaseEntity {
  @Column('decimal')
  totalAmount: number;

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, { cascade: true })
  items: OrderItemOrmEntity[];
}
