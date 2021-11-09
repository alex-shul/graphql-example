import { Book } from '../models/book';
import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { BookUsage } from '../models/usage';
import { IsNull, Not } from 'typeorm';

@Resolver(() => Book)
export class BookFieldsResolver implements ResolverInterface<Book> {
  @FieldResolver()
  async currentUsage(@Root() book: Book) {
    const bookEM = dbWrapper.getEntityManager('books');

    const [bookUsage] = await bookEM.find(BookUsage, {
      book: { id: book.id },
      endDate: IsNull(),
    });

    return bookUsage;
  }

  @FieldResolver()
  async completedUsages(@Root() book: Book) {
    const bookEM = dbWrapper.getEntityManager('books');

    const bookUsages = await bookEM.find(BookUsage, {
      book: { id: book.id },
      endDate: Not(IsNull()),
    });

    return bookUsages;
  }
}
