import { USER_ROLE } from '../../helpers/constants/constants';

const users = [
  {
    user: {
      id: 0,
      firstName: 'Admin',
      lastName: 'Admin',
      gender: 'Male',
      email: 'admin@born2die.com',
      role: USER_ROLE.ADMIN,
      addresses: [1, 3],
    },
  },
  {
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      gender: 'Male',
      dateOfBirth: '2000-01-01',
      email: 'seller1@gmail.com',
      avatar: 'http://localhost:5000/users/images/profile1.png',
      role: USER_ROLE.SELLER,
      addresses: [2],
    },
  },
  {
    user: {
      id: 2,
      firstName: 'Elon',
      lastName: 'Musk',
      role: USER_ROLE.SELLER,
      addresses: [],
    },
  },
  {
    user: {
      id: 3,
      firstName: 'Joe',
      lastName: 'Doe',
      role: USER_ROLE.CONSUMER,
      addresses: [],
    },
  },
];

export default users;