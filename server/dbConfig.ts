import { Client } from './src/area/client/models/client';
import { ConnectionOptions } from 'typeorm';
import { Book } from './src/area/book/models/book';
import { BookUsage } from './src/area/book/models/usage';

const schemas = [
  'clients',
  'books',
] as const;

export type DBSchema = typeof schemas[number];

export interface DBConfigItem {
  entities: ConnectionOptions['entities'];
}

export const dbConfig: Partial<Record<DBSchema, DBConfigItem>> = {
  clients: {
    entities: [Client],
  },
  books: {
    entities: [Book, BookUsage],
  },
};
