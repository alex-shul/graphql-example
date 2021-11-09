import { Client } from '../../client/models/client';
import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { BookUsage } from '../models/usage';

@Resolver(() => BookUsage)
export class BookUsageFieldsResolver implements ResolverInterface<BookUsage> {
  @FieldResolver()
  async client(@Root() bookUsage: BookUsage) {
    const clientEM = dbWrapper.getEntityManager('clients');

    const client = await clientEM.findOneOrFail(Client, {
      id: bookUsage.clientId,
    });

    return client;
  }
}
