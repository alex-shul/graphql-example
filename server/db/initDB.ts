import { dbWrapper } from './../src/shared/utils/dbWrapper';
import { dbConfig } from './../dbConfig';
/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as dotenv from 'dotenv';
import pgPromise from 'pg-promise';
import { AppState } from '../common/appState';
import { logger } from '../common/logger';
import { createBookUsages, createBooks } from './mocks/books';
import { createUsers } from './mocks/users';

const createDB = async (): Promise<void> => {
  const pgp = pgPromise({});
  let connectionString = `postgres://${process.env.dbUsername}:${process.env.dbPassword}@` +
                `${process.env.dbHost}:${process.env.dbPort}/postgres`;
  let db = pgp(connectionString);

  const res = await db.oneOrNone(`SELECT 1 FROM pg_database WHERE datname = '${process.env.dbBase}'`);
  if (res !== null) {
    // eslint-disable-next-line no-console
    console.log(`DROP DATABASE ${process.env.dbBase} ...`);
    const dropStr = `DROP DATABASE ${process.env.dbBase}`;
    await db.query(dropStr);
    // eslint-disable-next-line no-console
    console.log(`DROP DATABASE ${process.env.dbBase} complete`);
  }

  const str = `CREATE DATABASE ${process.env.dbBase}`;
  // eslint-disable-next-line no-console
  console.log(`${str}...`);
  await db.query(str);

  await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgp.end();

  // eslint-disable-next-line no-console
  console.log(`CREATE DATABASE ${process.env.dbBase} complete`);

  connectionString = `postgres://${process.env.dbUsername}:${process.env.dbPassword}@` +
    `${process.env.dbHost}:${process.env.dbPort}/${process.env.dbBase}`;
  db = pgp(connectionString);

  // eslint-disable-next-line no-console
  console.log('CREATE DATABASE SCHEMAS...');
  for (const schema of Object.keys(dbConfig)) {
    await db.query(`CREATE SCHEMA ${schema}`);
  }

  // eslint-disable-next-line no-console
  console.log('CREATE SCHEMAS complete');

  pgp.end();
};

if (!process.env.dbHost) {
  const argvMaxLen = 2;
  if (process.argv.length > argvMaxLen) {
    dotenv.config({ path: process.argv[argvMaxLen] });
  } else {
    dotenv.config({ path: '.env' });
  }
}

const initDB = async () => {
  await createDB();

  logger.message('Initialize users ...');
  await dbWrapper.initialize('users', true, true);
  await createUsers();
  logger.message('Initialize user complete');

  logger.message('Initialize books ...');
  await dbWrapper.initialize('books', true, true);
  await createBooks();
  await createBookUsages();
  logger.message('Initialize book complete');

  await dbWrapper.close('users');
  await dbWrapper.close('books');
};

export const main = async () => {
  AppState.Begin();
  await initDB();
  AppState.End();
};

main();
