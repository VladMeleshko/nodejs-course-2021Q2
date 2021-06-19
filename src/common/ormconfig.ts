import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { Users } from '../entities/user';
import { Tasks } from '../entities/task';
import { Boards } from '../entities/board';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  type: 'postgres',
  name: 'default',
  synchronize: false,
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [Users, Tasks, Boards],
  migrations: [path.join(__dirname, '../migration/*.ts')],
  cli: {
    migrationsDir: 'migration',
  },
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
} as ConnectionOptions;

export default config;
