import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartMapper } from 'src/infra/mappers';
import { CartOrmEntity } from 'src/infra/orm';
import { Repository } from 'typeorm';
import { Cart } from './domain/cart.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartOrmEntity)
    private readonly repository: Repository<CartOrmEntity>,
  ) {}

  async save(cart: Cart): Promise<Cart> {
    const ormEntity = CartMapper.toOrm(cart);
    const savedEntity = await this.repository.save(ormEntity);
    return CartMapper.toDomain(savedEntity);
  }

  async findOne(id: string): Promise<Cart | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!ormEntity) return null;
    return CartMapper.toDomain(ormEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
