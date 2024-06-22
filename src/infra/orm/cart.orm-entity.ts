import { Entity, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { BaseEntity } from './base.orm-entity';
import { CartItemOrmEntity } from './cart-item.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

@Entity('carts')
export class CartOrmEntity extends BaseEntity {
  @OneToMany(() => CartItemOrmEntity, (item) => item.cart, { cascade: true })
  items: CartItemOrmEntity[];

  @ManyToOne(() => UserOrmEntity, (user) => user.carts)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;

  @Column({ nullable: true })
  userId: string;
}
