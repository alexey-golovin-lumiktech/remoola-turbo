import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from './naming.strategy';

export const typeormConfig = {
  type: `postgres` as const,
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === `true` ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  password: process.env.POSTGRES_PASSWORD,
  migrations: [__dirname + `/../migrations/*.{ts,js}`],
};

export const typeormAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (cfg: ConfigService) => {
    return {
      ...typeormConfig,
      url: cfg.get<string>(`DATABASE_URL`),
      ssl: cfg.get(`DB_SSL`) === `true` ? { rejectUnauthorized: false } : false,
      logging: [`warn`, `error`],
      password: cfg.get<string>(`POSTGRES_PASSWORD`),
      synchronize: true,
    };
  },
  inject: [ConfigService],
};

export default new DataSource(typeormConfig);
