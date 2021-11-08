import { Book } from '../models/book';
import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { User } from '../../user/models/user';
import { BookUsage } from '../models/usage';
import { In, IsNull, Not } from 'typeorm';

@Resolver(() => Book)
export class BookResolver implements ResolverInterface<Book> {
  @FieldResolver()
  async usedBy(@Root() book: Book) {
    const userEM = dbWrapper.getEntityManager('users');
    const bookEM = dbWrapper.getEntityManager('books');

    const bookUsages = await bookEM.find(BookUsage, {
      bookId: book.id,
      endDate: IsNull(),
    });

    if (!bookUsages.length) {
      return undefined;
    }

    return userEM.findOne(User, {
      id: bookUsages[0].userId,
    });
  }

  @FieldResolver()
  async completedBy(@Root() book: Book) {
    const userEM = dbWrapper.getEntityManager('users');
    const bookEM = dbWrapper.getEntityManager('books');

    const bookUsages = await bookEM.find(BookUsage, {
      bookId: book.id,
      endDate: Not(IsNull()),
    });

    if (!bookUsages.length) {
      return [];
    }

    return userEM.find(User, {
      id: In(bookUsages.map(bu => bu.userId)),
    });
  }
}
