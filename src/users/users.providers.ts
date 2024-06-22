import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../infra/orm/user.orm-entity';
import { DATABASE_CONNECTION_TOKEN } from 'src/infra/database/database.providers';

export const USER_PROVIDER_TOKEN = 'USER_PROVIDER';

export const userProviders = [
  {
    provide: USER_PROVIDER_TOKEN,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserOrmEntity),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
