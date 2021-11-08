import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/user';
import { UpdateUserInput } from '../inputs/updateUserInput';

@Resolver()
export class UserCrudResolver {
  @Query(() => [User])
  users() {
    const em = dbWrapper.getEntityManager('users');
    return em.find(User);
  }

  @Query(() => User)
  user(@Arg('id') id: number) {
    const em = dbWrapper.getEntityManager('users');
    return em.findOne(User, { where: { id } });
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: UpdateUserInput) {
    const em = dbWrapper.getEntityManager('users');
    const user = await em.findOne(User, { where: { id } });

    if (!user) {
      throw new Error('Book not found!');
    }

    Object.assign(user, data);

    await em.save(user);

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    const em = dbWrapper.getEntityManager('users');
    const user = await em.findOne(User, { where: { id } });

    if (!user) {
      throw new Error('Book not found!');
    }

    await em.remove(user);

    return true;
  }
}
