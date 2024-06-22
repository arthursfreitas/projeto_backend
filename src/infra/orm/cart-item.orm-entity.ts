import { Entity, Column, ManyToOne } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity';
import { CartOrmEntity } from './cart.orm-entity';
import { BaseEntity } from './base.orm-entity';

@Entity('cart_items')
export class CartItemOrmEntity extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => ProductOrmEntity, { eager: true })
  product: ProductOrmEntity;

  @ManyToOne(() => CartOrmEntity, (cart) => cart.items)
  cart: CartOrmEntity;
}
