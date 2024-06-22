import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const ONE_HOUR = 3600000;

const cacheOption = {
  default: process.env.DATABASE_CACHE === 'true',
  redis: {
    type: 'ioredis',
    options: {
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379,
    },
    duration: ONE_HOUR,
  },
};

function cacheConfig() {
  switch (process.env.CACHE_OPTION) {
    case 'redis':
      return cacheOption.redis;
    case 'default':
      return cacheOption.default;
    default:
      return cacheOption.default;
  }
}

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION_TOKEN';

export const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [
    __dirname + '/../../infra/orm/*.orm-entity{.ts,.js}',
    __dirname + '/../../modules/**/*.entity{.ts,.js}',
  ],
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: false,
  cache: cacheConfig() as object,
  synchronize: true,
  connectTimeoutMS: Number(process.env.DATABASE_CONNECTION_TIMEOUT),
  migrations: [
    __dirname.includes('dist')
      ? 'dist/src/database/migrations/**'
      : 'src/database/migrations/**',
  ],
});

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_TOKEN,
    useFactory: async () => {
      return AppDataSource.initialize();
    },
  },
];
