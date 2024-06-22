import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';
import { CartItemOrmEntity } from 'src/infra/orm';
import { DataSource } from 'typeorm';

export const CART_ITEM_PROVIDER_TOKEN = 'CART_ITEM_PROVIDER';

export const cartItemProviders = [
  {
    provide: CART_ITEM_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CartItemOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
