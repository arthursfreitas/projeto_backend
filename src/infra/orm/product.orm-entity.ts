import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.orm-entity';
import { CategoryOrmEntity } from './category.orm-entity';

@Entity('products')
export class ProductOrmEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => CategoryOrmEntity, (category) => category.products)
  category: CategoryOrmEntity;
}
