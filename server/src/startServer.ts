import 'reflect-metadata';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import compression from 'compression';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import morgan from 'morgan';
import * as http from 'http';

if (!process.env.dbHost) {
  dotenv.config({ path: '.env' });
}

const defaultPort = 3000;

import { logger } from '../common/logger';
import { defaultMaxBodySizeKb, maxQueryComplexity } from './shared/constants';
import { dbWrapper } from './shared/utils/dbWrapper';
import { buildSchema } from 'type-graphql';
import createComplexityRule, { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';
import { BookFieldsResolver } from './area/book/resolvers/bookFields';
import { ClientResolver } from './area/client/resolvers/client';
import { ClientFieldsResolver } from './area/client/resolvers/clientFields';
import { BookResolver } from './area/book/resolvers/book';
import { BookUsageResolver } from './area/book/resolvers/usage';
import { BookUsageFieldsResolver } from './area/book/resolvers/usageFields';


const app = express();
const httpServer = new http.Server(app);

app.use(compression());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: logger.stream,
}));

const init = async (): Promise<void> => {
  await dbWrapper.initialize('clients');
  await dbWrapper.initialize('books');

  const schema = await buildSchema({
    resolvers: [
      ClientFieldsResolver,
      ClientResolver,
      BookFieldsResolver,
      BookResolver,
      BookUsageResolver,
      BookUsageFieldsResolver,
    ]
  });

  app.use('/graphql', graphqlHTTP((request, response, gqlParams) => {
    if (!gqlParams) {
      throw new Error('Invalid query');
    }

    const { variables } = gqlParams;

    return {
      schema,
      validationRules: [
        createComplexityRule({
          estimators: [
            fieldExtensionsEstimator(),
            // Configure your estimators
            simpleEstimator({ defaultComplexity: 1 }),
          ],
          maximumComplexity: maxQueryComplexity,
          variables: variables ?? undefined,
          onComplete: (complexity: number) => {
            logger.verbose(`Query Complexity: ${complexity}`);
          },
        }),
      ],
      graphiql: true,
    };
  }));

  httpServer.listen(app.get('port'), () => {
    logger.message(`App listening on port ${app.get('port')}`);
  });
};

export const startServer = async () => {
  app.set('port', (process.env.PORT || defaultPort));

  let maxBodySizeKb = Number(process.env.maxBodySizeKb);
  if (isNaN(maxBodySizeKb)) {
    maxBodySizeKb = defaultMaxBodySizeKb;
  }

  app.disable('x-powered-by');

  await init();

  return httpServer;
};
