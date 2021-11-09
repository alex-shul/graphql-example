import { BookUsage } from './../../src/area/book/models/usage';
import { Client } from '../../src/area/client/models/client';
import { Book } from '../../src/area/book/models/book';
import { dbWrapper } from '../../src/shared/utils/dbWrapper';
import booksMockData from './books.json';

export const createBooks = async () => {
  const em = dbWrapper.getEntityManager('books');
  for (const bookMock of booksMockData) {
    const book = new Book();
    book.title = bookMock.title;
    book.author = bookMock.author;
    book.yearWritten = bookMock.year_written;
    book.descriptionShort = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis mi, sodales nec gravida ut, eleifend nec mi.';
    book.descriptionFull = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis mi, sodales nec gravida ut, eleifend nec mi. Nunc et tristique urna. Integer tincidunt imperdiet sapien eget molestie. Cras id pellentesque ante. Cras sit amet nibh lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed lobortis in lectus in venenatis. Aenean felis ipsum, dictum ac sollicitudin vel, laoreet in odio. Sed bibendum sapien quis odio pretium, a commodo eros sollicitudin. Sed tristique mattis nisl, id convallis augue bibendum maximus.';
    await em.save(book);
  }
};

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const timePeriodTS = 1000 * 60 * 60 * 24 * 30 * 12;

const randomBoolean = () => Math.round(Math.random());

const getRandomPeriod = (fromPeriodTS: number): number => {
  return Math.round(Math.random() * fromPeriodTS);
};

export const createBookUsages = async () => {
  const clientsEM = dbWrapper.getEntityManager('clients');
  const booksEM = dbWrapper.getEntityManager('books');

  const books = await booksEM.find(Book);
  const clients = await clientsEM.find(Client);

  const timeEndTS = Date.now();
  const timeStartTS = timeEndTS - timePeriodTS;

  for (const client of clients) {
    let hasBookInProgress = false;

    for (const book of books) {
      const isUsed = randomBoolean();

      if (!isUsed) {
        continue;
      }

      const readingPeriodTS = getRandomPeriod(timePeriodTS);
      const startReadingTS = timeStartTS + getRandomPeriod(timePeriodTS - readingPeriodTS);

      const bookUsage = new BookUsage();
      bookUsage.book = book;
      bookUsage.clientId = client.id;
      bookUsage.startDate = new Date(startReadingTS);

      if (!hasBookInProgress && randomBoolean()) {
        hasBookInProgress = true;
      } else {
        bookUsage.endDate = new Date(startReadingTS + readingPeriodTS);
      }

      await booksEM.save(bookUsage);
    }
  }
};
