import { dbWrapper } from '../../../shared/utils/dbWrapper';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateBookInput } from '../inputs/createBookInput';
import { UpdateBookInput } from '../inputs/updateBookInput';
import { Book } from '../models/book';

@Resolver()
export class BookCRUDResolver {
  @Query(() => [Book])
  books() {
    const em = dbWrapper.getEntityManager('books');
    return em.find(Book);
  }

  @Query(() => Book)
  book(@Arg('id') id: number) {
    const em = dbWrapper.getEntityManager('books');
    return em.findOne(Book, { where: { id } });
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput) {
    const em = dbWrapper.getEntityManager('books');
    const book = em.create(Book, data);
    await em.save(book);
    return book;
  }

  @Mutation(() => Book)
  async updateBook(@Arg('id') id: string, @Arg('data') data: UpdateBookInput) {
    const em = dbWrapper.getEntityManager('books');
    const book = await em.findOne(Book, { where: { id } });

    if (!book) {
      throw new Error('Book not found!');
    }

    Object.assign(book, data);

    await em.save(book);

    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg('id') id: string) {
    const em = dbWrapper.getEntityManager('books');
    const book = await em.findOne(Book, { where: { id } });

    if (!book) {
      throw new Error('Book not found!');
    }

    await em.remove(book);

    return true;
  }
}
