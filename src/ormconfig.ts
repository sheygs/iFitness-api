import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // entities: ['dist/shared/database/entities/*.js'],
  entities: [__dirname + '/shared/database/entities/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: [__dirname + '/shared/database/migrations/*{.ts,.js}'],
  logging: process.env.NODE_ENV !== 'production',
};
