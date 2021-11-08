import { User } from './src/area/user/models/user';
import { ConnectionOptions } from 'typeorm';
import { Book } from './src/area/book/models/book';
import { BookUsage } from './src/area/book/models/usage';

const schemas = [
  'users',
  'books',
] as const;

export type DBSchema = typeof schemas[number];

export interface DBConfigItem {
  entities: ConnectionOptions['entities'];
}

export const dbConfig: Partial<Record<DBSchema, DBConfigItem>> = {
  users: {
    entities: [User],
  },
  books: {
    entities: [Book, BookUsage],
  },
};
