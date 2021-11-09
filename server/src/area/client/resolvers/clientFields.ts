import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Client } from '../models/client';
import { BookUsage } from '../../book/models/usage';
import { IsNull, Not } from 'typeorm';

@Resolver(() => Client)
export class ClientFieldsResolver implements ResolverInterface<Client> {
  @FieldResolver()
  async currentBookUsages(@Root() client: Client) {
    const em = dbWrapper.getEntityManager('books');

    const bookUsages = await em.find(BookUsage, {
      where: {
        clientId: client.id,
        endDate: IsNull(),
      },
      relations: ['book'],
    });

    return bookUsages;
  }

  @FieldResolver()
  async completedBookUsages(@Root() client: Client) {
    const em = dbWrapper.getEntityManager('books');

    const bookUsages = await em.find(BookUsage, {
      where: {
        clientId: client.id,
        endDate: Not(IsNull()),
      },
      relations: ['book'],
    });

    return bookUsages;
  }
}
