import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';
import { CategoryOrmEntity } from 'src/infra/orm/category.orm-entity';
import { DataSource } from 'typeorm';

export const CATEGORY_PROVIDER_TOKEN = 'CATEGORY_PROVIDER';

export const categoryProviders = [
  {
    provide: CATEGORY_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
