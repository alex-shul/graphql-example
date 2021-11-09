import { IsNull } from 'typeorm';
import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { Arg, ID, Mutation, Resolver } from 'type-graphql';
import { Book } from '../models/book';
import { BookUsage } from '../models/usage';
import { Client } from '../../client/models/client';

@Resolver()
export class BookUsageResolver {
  @Mutation(() => BookUsage)
  async giveBookToUser(@Arg('clientId', () => ID) clientId: number, @Arg('bookId', () => ID) bookId: number) {
    const clientsEM = dbWrapper.getEntityManager('clients');
    const booksEM = dbWrapper.getEntityManager('books');

    const client = await clientsEM.findOne(Client, { id: clientId });

    if (!client) {
      throw new Error('User not found!');
    }

    const book = await booksEM.findOne(Book, { id: bookId });

    if (!book) {
      throw new Error('Book not found!');
    }

    const existedBookUsage = await booksEM.findOne(BookUsage, {
      book: { id: bookId },
      endDate: IsNull(),
    });

    if (existedBookUsage) {
      throw new Error('This books is already in usage!');
    }

    const newBookUsage = new BookUsage();
    newBookUsage.clientId = client.id;
    newBookUsage.book = book;
    newBookUsage.startDate = new Date();

    return booksEM.save(newBookUsage);
  }

  @Mutation(() => BookUsage)
  async takeBookFromUser(@Arg('clientId', () => ID) clientId: number, @Arg('bookId', () => ID) bookId: number) {
    const clientsEM = dbWrapper.getEntityManager('clients');
    const booksEM = dbWrapper.getEntityManager('books');

    const client = await clientsEM.findOne(Client, { id: clientId });

    if (!client) {
      throw new Error('User not found!');
    }

    const book = await booksEM.findOne(Book, { id: bookId });

    if (!book) {
      throw new Error('Book not found!');
    }

    const bookUsage = await booksEM.findOne(BookUsage, {
      clientId: client.id,
      book: { id: book.id },
      endDate: IsNull()
    });

    if (!bookUsage) {
      throw new Error('Book is not given to a client or already taken from him!');
    }

    bookUsage.endDate = new Date();

    return booksEM.save(bookUsage);
  }
}
