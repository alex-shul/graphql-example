import { User } from '../../src/area/user/models/user';
import { dbWrapper } from '../../src/shared/utils/dbWrapper';
import usersMockData from './users.json';

export const createUsers = async () => {
  const em = dbWrapper.getEntityManager('users');
  for (const userMock of usersMockData) {
    const user = new User();
    user.name = userMock.name;
    user.surname = userMock.surname;
    user.isActive = true;
    await em.save(user);
  }
};
