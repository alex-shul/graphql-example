import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../models/user';
import { CreateUserInput } from '../inputs/createUserInput';
import { dbWrapper } from '../../../shared/utils/dbWrapper';

@Resolver()
export class UserAuthResolver {
  @Mutation(() => User)
  async signup(@Arg('data') data: CreateUserInput) {
    const em = dbWrapper.getEntityManager('users');
    const user = await em.save(User, data);
    return user;
  }
}
