import { User } from 'src/app/utilities/User';

const user1: User = {
  id: 1,
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@admin.pl',
  password: 'admin',
};

const user2: User = {
  id: 2,
  firstName: 'admin',
  lastName: 'admin',
  email: 'test@test.pl',
  password: 'test',
};

const mockUserArray: User[] = [user1, user2];

export { user1, user2, mockUserArray };
