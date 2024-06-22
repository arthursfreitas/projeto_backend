import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';
import { ProductOrmEntity } from 'src/infra/orm/product.orm-entity';
import { DataSource } from 'typeorm';

export const PRODUCT_PROVIDER_TOKEN = 'PRODUCT_PROVIDER';

export const productProviders = [
  {
    provide: PRODUCT_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
