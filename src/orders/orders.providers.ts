import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';
import { OrderOrmEntity } from 'src/infra/orm/order.orm-entity';
import { DataSource } from 'typeorm';

export const ORDER_PROVIDER_TOKEN = 'ORDER_PROVIDER';

export const orderProviders = [
  {
    provide: ORDER_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
