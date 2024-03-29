import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Client } from '../models/client';
import { UpdateClientInput } from '../inputs/updateClientInput';
import { CreateClientInput } from '../inputs/createClientInput';

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients() {
    const em = dbWrapper.getEntityManager('clients');
    return em.find(Client);
  }

  @Query(() => Client)
  async client(@Arg('id', () => ID) id: string): Promise<Client> {
    const em = dbWrapper.getEntityManager('clients');
    const client = await em.findOneOrFail(Client, { where: { id } });
    return client;
  }

  @Mutation(() => Client)
  async addClient(@Arg('data') data: CreateClientInput) {
    const em = dbWrapper.getEntityManager('clients');
    const client = await em.save(Client, data);
    return client;
  }

  @Mutation(() => Client)
  async updateClient(@Arg('id', () => ID) id: string, @Arg('data') data: UpdateClientInput) {
    const em = dbWrapper.getEntityManager('clients');
    const client = await em.findOne(Client, { where: { id } });

    if (!client) {
      throw new Error('Book not found!');
    }

    Object.assign(client, data);

    await em.save(client);

    return client;
  }

  @Mutation(() => Boolean)
  async deleteClient(@Arg('id', () => ID) id: string) {
    const em = dbWrapper.getEntityManager('clients');
    const client = await em.findOne(Client, { where: { id } });

    if (!client) {
      throw new Error('Book not found!');
    }

    await em.remove(client);

    return true;
  }
}
