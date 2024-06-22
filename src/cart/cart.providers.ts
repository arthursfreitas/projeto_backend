import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';
import { CartOrmEntity } from 'src/infra/orm';
import { DataSource } from 'typeorm';

export const CART_PROVIDER_TOKEN = 'CART_PROVIDER';

export const cartProviders = [
  {
    provide: CART_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CartOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
