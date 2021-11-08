import { IsNull } from 'typeorm';
import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { Arg, Query, Resolver } from 'type-graphql';
import { Book } from '../models/book';
import { BookUsage } from '../models/usage';
import { User } from '../../user/models/user';

@Resolver()
export class BookUsageCRUDResolver {
  @Query(() => BookUsage)
  async giveBookToUser(@Arg('userId') userId: number, @Arg('bookId') bookId: number) {
    const usersEM = dbWrapper.getEntityManager('users');
    const booksEM = dbWrapper.getEntityManager('books');

    const user = await usersEM.findOne(User, { id: userId });

    if (!user) {
      throw new Error('User not found!');
    }

    const book = await booksEM.findOne(Book, { id: bookId });

    if (!book) {
      throw new Error('Book not found!');
    }

    const existedBookUsage = await booksEM.findOne(BookUsage, {
      bookId,
      endDate: IsNull(),
    });

    if (existedBookUsage) {
      throw new Error('This books is already in usage!');
    }

    const newBookUsage = new BookUsage();
    newBookUsage.userId = userId;
    newBookUsage.bookId = bookId;
    newBookUsage.startDate = new Date();

    return booksEM.save(newBookUsage);
  }

  @Query(() => BookUsage)
  async takeBookFromUser(@Arg('userId') userId: number, @Arg('bookId') bookId: number) {
    const usersEM = dbWrapper.getEntityManager('users');
    const booksEM = dbWrapper.getEntityManager('books');

    const user = await usersEM.findOne(User, { id: userId });

    if (!user) {
      throw new Error('User not found!');
    }

    const book = await booksEM.findOne(Book, { id: bookId });

    if (!book) {
      throw new Error('Book not found!');
    }

    const bookUsage = await booksEM.findOne(BookUsage, {
      userId: user.id,
      bookId: book.id,
      endDate: IsNull()
    });

    if (!bookUsage) {
      throw new Error('Book is not given to a user or already taken from him!');
    }

    bookUsage.endDate = new Date();

    return booksEM.save(bookUsage);
  }
}
