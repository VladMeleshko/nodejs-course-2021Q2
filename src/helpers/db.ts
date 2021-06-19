import { createConnection, Connection } from 'typeorm';
import 'reflect-metadata';
import { config } from '../common/ormconfig';

export const tryDBConnect = async (): Promise<Connection> => {
  return createConnection(config);
};
