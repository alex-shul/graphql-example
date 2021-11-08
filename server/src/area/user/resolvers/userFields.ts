import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { User } from '../models/user';
import { BookUsage } from '../../book/models/usage';
import { Book } from '../../book/models/book';
import { In, IsNull, Not } from 'typeorm';

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  @FieldResolver()
  async booksInProgress(@Root() user: User) {
    const em = dbWrapper.getEntityManager('books');

    const bookUsages = await em.find(BookUsage, {
      userId: user.id,
      endDate: IsNull(),
    });

    return em.find(Book, {
      id: In(bookUsages.map(bu => bu.bookId)),
    }) as Promise<[Book]>;
  }

  @FieldResolver()
  async booksCompleted(@Root() user: User) {
    const em = dbWrapper.getEntityManager('books');

    const bookUsages = await em.find(BookUsage, {
      userId: user.id,
      endDate: Not(IsNull()),
    });

    return em.find(Book, {
      id: In(bookUsages.map(bu => bu.bookId)),
    }) as Promise<[Book]>;
  }
}
