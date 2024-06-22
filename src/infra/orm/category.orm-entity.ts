import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.orm-entity';
import { ProductOrmEntity } from './product.orm-entity';

@Entity('categories')
export class CategoryOrmEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ProductOrmEntity, (product) => product.category)
  products: ProductOrmEntity[];
}
