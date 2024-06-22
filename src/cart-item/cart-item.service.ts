import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/infra/base.service';
import { CartItemMapper } from 'src/infra/mappers';
import { CartItemOrmEntity } from 'src/infra/orm';
import { Repository } from 'typeorm';
import { CartItem } from './domain/cart-item.entity';
import { CART_ITEM_PROVIDER_TOKEN } from './cart-item.providers';

@Injectable()
export class CartItemService extends BaseService<CartItem, CartItemOrmEntity> {
  constructor(
    @Inject(CART_ITEM_PROVIDER_TOKEN)
    private readonly cartItemRepository: Repository<CartItemOrmEntity>,
  ) {
    super(cartItemRepository, CartItemMapper.toDomain, CartItemMapper.toOrm);
  }
}
