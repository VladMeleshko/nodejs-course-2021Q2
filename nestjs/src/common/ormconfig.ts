import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Users } from '../entities/user';
import { Boards } from '../entities/board';
import { Tasks } from '../entities/task';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  name: 'default',
  synchronize: false,
  host: process.env['POSTGRES_HOST'],
  port: +process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [Users, Boards, Tasks],
  //   migrations: [path.join(__dirname, '../migration/*.ts')],
  //   cli: {
  //     migrationsDir: 'migration',
  //   },
  //   autoReconnect: true,
  //   reconnectTries: Number.MAX_VALUE,
  //   reconnectionInterval: 1000,
};
