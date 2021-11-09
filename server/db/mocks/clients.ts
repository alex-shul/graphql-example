import { Client } from '../../src/area/client/models/client';
import { dbWrapper } from '../../src/shared/utils/dbWrapper';
import clientsMockData from './clients.json';

export const createUsers = async () => {
  const em = dbWrapper.getEntityManager('clients');
  for (const userMock of clientsMockData) {
    const user = new Client();
    user.name = userMock.name;
    user.surname = userMock.surname;
    user.isActive = true;
    await em.save(user);
  }
};
