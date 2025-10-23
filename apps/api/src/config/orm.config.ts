import { type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from './naming.strategy';
import {
  DATABASE_URL,
  POSTGRES_SSL,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_TIMEZONE,
  POSTGRES_USER,
} from '../envs';

export const common = {
  type: `postgres` as const,
  url: DATABASE_URL,
  ssl: POSTGRES_SSL == `true` ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  password: POSTGRES_PASSWORD,
  extra: { options: `-c timezone=${POSTGRES_TIMEZONE}` },
  migrations: [__dirname + `/../migrations/*.{ts,js}`],
};

export const ormConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: `postgres`,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [__dirname + `/../**/*.entity.{ts,js}`],
    migrations: [__dirname + `/../database/migrations/*.{ts,js}`],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  dataSourceFactory: (options: DataSourceOptions) => {
    const dataSource = new DataSource(options);
    return dataSource.initialize();
  },
};
