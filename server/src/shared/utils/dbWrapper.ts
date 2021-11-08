import { createConnection, getManager } from 'typeorm';
import { DBSchema, dbConfig } from '../../../dbConfig';

class DBWrapper {
  private connections: Partial<Record<DBSchema, any>> = {};

  public async initialize (schema: DBSchema, dropSchema = false, synchronize = false) {
    this.connections[schema] = await createConnection({
      name: schema,
      type: 'postgres',
      replication: {
        master: {
          host: process.env.dbHost,
          port: parseInt(process.env.dbPort ?? ''),
          username: process.env.dbUsername,
          password: process.env.dbPassword,
          database: process.env.dbBase
        },
        slaves: []
      },
      entities: dbConfig[schema]?.entities,
      schema,
      synchronize,
      dropSchema,
    });
  }

  public getEntityManager (schema: DBSchema) {
    return getManager(schema);
  }

  public async close (schema: DBSchema) {
    if (this.connections[schema]) {
      await this.connections[schema].close();
      this.connections[schema] = null;
    }
  }
}

export const dbWrapper = new DBWrapper();
