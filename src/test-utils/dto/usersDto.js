import { Role } from '../../ts/enums/enums';

import { initialWishlistsDto, wishlistsDto } from './wishlistsDto';

const users = [
  {
    user: {
      id: 0,
      firstName: 'Admin',
      lastName: 'Admin',
      gender: 'Male',
      email: 'admin@born2die.com',
      role: Role.Admin,
      addresses: [1, 3],
      wishlists: initialWishlistsDto,
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
      role: Role.Seller,
      addresses: [2],
      wishlists: initialWishlistsDto,
    },
  },
  {
    user: {
      id: 2,
      firstName: 'Elon',
      lastName: 'Musk',
      role: Role.Seller,
      addresses: [],
      wishlists: initialWishlistsDto,
    },
  },
  {
    user: {
      id: 3,
      firstName: 'Joe',
      lastName: 'Doe',
      role: Role.Consumer,
      addresses: [],
      wishlists: wishlistsDto,
    },
  },
];

export default users;
