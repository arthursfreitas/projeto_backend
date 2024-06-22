import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.orm-entity';
import { CartOrmEntity } from './cart.orm-entity';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CartOrmEntity, (cart) => cart.user, { cascade: true })
  carts: CartOrmEntity[];
}
