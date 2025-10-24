import { type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { parsedEnvs } from '@remoola/env';

import { SnakeNamingStrategy } from './naming.strategy';

export const common = {
  type: `postgres` as const,
  url: parsedEnvs.DATABASE_URL,
  ssl: parsedEnvs.POSTGRES_SSL == `true` ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  password: parsedEnvs.POSTGRES_PASSWORD,
  extra: { options: `-c timezone=${parsedEnvs.POSTGRES_TIMEZONE}` },
  migrations: [__dirname + `/../migrations/*.{ts,js}`],
};

export const ormConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: `postgres`,
    host: parsedEnvs.POSTGRES_HOST,
    port: parsedEnvs.POSTGRES_PORT,
    username: parsedEnvs.POSTGRES_USER,
    password: parsedEnvs.POSTGRES_PASSWORD,
    database: parsedEnvs.POSTGRES_DB,
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
