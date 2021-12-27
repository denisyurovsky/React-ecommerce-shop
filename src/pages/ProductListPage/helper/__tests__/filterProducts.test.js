import productsDto from '../../../../test-utils/dto/productsDto';
import { sortTypes } from '../../constants/constants';
import filterProducts from '../filterProducts';

const expected1 = [
  {
    id: 1,
    name: 'Incredible Plastic Table',
    price: '790.00',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: '1177e14e-4128-401a-a3e4-47909992f94b',
      name: 'Clothing',
    },
    author: {
      id: '3186fb76-80c8-40a2-8cf0-9ee8272ec668',
      firstName: 'Cassandra',
      lastName: "O'Hara",
    },
    createdAt: '2021-04-17T07:18:07.870Z',
    updatedAt: '2021-10-14T17:03:47.317Z',
    images: [],
  },
  {
    id: 4,
    name: 'Incredible Metal Chair',
    price: '130.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    category: {
      id: '4f594314-2b23-4f95-b0db-34739fde2c0a',
      name: 'Clothing',
    },
    author: {
      id: '107d9c97-58f1-4926-883b-ea7421c53a13',
      firstName: 'Austen',
      lastName: 'Romaguera',
    },
    createdAt: '2021-03-29T04:41:15.527Z',
    updatedAt: '2021-04-07T13:31:55.867Z',
    images: [],
  },
];

const expected2 = [
  {
    id: 5,
    name: 'Fantastic Concrete Computer',
    price: '805.00',
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    category: {
      id: '3ea98de9-451b-4b8c-be2e-a063b9cf6fe8',
      name: 'Games',
    },
    author: {
      id: '3e0ae647-2908-47ec-a569-f025212b8007',
      firstName: 'Unique',
      lastName: 'Willms',
    },
    createdAt: '2021-10-16T05:33:02.583Z',
    updatedAt: '2021-10-20T04:05:37.000Z',
    images: [],
  },
  {
    id: 1,
    name: 'Incredible Plastic Table',
    price: '790.00',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: '1177e14e-4128-401a-a3e4-47909992f94b',
      name: 'Clothing',
    },
    author: {
      id: '3186fb76-80c8-40a2-8cf0-9ee8272ec668',
      firstName: 'Cassandra',
      lastName: "O'Hara",
    },
    createdAt: '2021-04-17T07:18:07.870Z',
    updatedAt: '2021-10-14T17:03:47.317Z',
    images: [],
  },
  {
    id: 0,
    name: 'Intelligent Cotton Pants',
    price: '670.00',
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    category: {
      id: 'e8d65a83-7e30-48ae-a786-2f3ccbfc51b8',
      name: 'Home',
    },
    author: {
      id: 'eded1d04-20ea-4196-af68-3b452acd600c',
      firstName: 'Lindsay',
      lastName: 'Yundt',
    },
    createdAt: '2021-11-10T17:35:05.565Z',
    updatedAt: '2021-11-24T02:22:24.505Z',
    images: [],
  },

  {
    id: 2,
    name: 'Incredible Rubber Cheese',
    price: '638.00',
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: '2eb9ac55-c45e-4c6e-b0a7-911cf1759f66',
      name: 'Home',
    },
    author: {
      id: '3cec940c-9259-480e-b57e-c9704edb8f12',
      firstName: 'Jany',
      lastName: 'Collins',
    },
    createdAt: '2021-01-09T11:29:45.814Z',
    updatedAt: '2021-05-12T04:43:57.783Z',
    images: [],
  },
  {
    id: 4,
    name: 'Incredible Metal Chair',
    price: '130.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    category: {
      id: '4f594314-2b23-4f95-b0db-34739fde2c0a',
      name: 'Clothing',
    },
    author: {
      id: '107d9c97-58f1-4926-883b-ea7421c53a13',
      firstName: 'Austen',
      lastName: 'Romaguera',
    },
    createdAt: '2021-03-29T04:41:15.527Z',
    updatedAt: '2021-04-07T13:31:55.867Z',
    images: [],
  },
  {
    id: 3,
    name: 'Incredible Metal Shoes',
    price: '67.00',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: 'c8c3e0b8-1206-4010-831d-4838fd413419',
      name: 'Home',
    },
    author: {
      id: '9f6850dc-43bc-4966-9cb6-8625021e0e1c',
      firstName: 'Dangelo',
      lastName: 'Morissette',
    },
    createdAt: '2021-03-18T07:51:04.578Z',
    updatedAt: '2021-11-26T03:53:43.493Z',
    images: [],
  },
];

const expected3 = [
  {
    id: 3,
    name: 'Incredible Metal Shoes',
    price: '67.00',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: 'c8c3e0b8-1206-4010-831d-4838fd413419',
      name: 'Home',
    },
    author: {
      id: '9f6850dc-43bc-4966-9cb6-8625021e0e1c',
      firstName: 'Dangelo',
      lastName: 'Morissette',
    },
    createdAt: '2021-03-18T07:51:04.578Z',
    updatedAt: '2021-11-26T03:53:43.493Z',
    images: [],
  },
  {
    id: 4,
    name: 'Incredible Metal Chair',
    price: '130.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    category: {
      id: '4f594314-2b23-4f95-b0db-34739fde2c0a',
      name: 'Clothing',
    },
    author: {
      id: '107d9c97-58f1-4926-883b-ea7421c53a13',
      firstName: 'Austen',
      lastName: 'Romaguera',
    },
    createdAt: '2021-03-29T04:41:15.527Z',
    updatedAt: '2021-04-07T13:31:55.867Z',
    images: [],
  },
];

const expected4 = [
  {
    id: 2,
    name: 'Incredible Rubber Cheese',
    price: '638.00',
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: '2eb9ac55-c45e-4c6e-b0a7-911cf1759f66',
      name: 'Home',
    },
    author: {
      id: '3cec940c-9259-480e-b57e-c9704edb8f12',
      firstName: 'Jany',
      lastName: 'Collins',
    },
    createdAt: '2021-01-09T11:29:45.814Z',
    updatedAt: '2021-05-12T04:43:57.783Z',
    images: [],
  },
  {
    id: 3,
    name: 'Incredible Metal Shoes',
    price: '67.00',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: 'c8c3e0b8-1206-4010-831d-4838fd413419',
      name: 'Home',
    },
    author: {
      id: '9f6850dc-43bc-4966-9cb6-8625021e0e1c',
      firstName: 'Dangelo',
      lastName: 'Morissette',
    },
    createdAt: '2021-03-18T07:51:04.578Z',
    updatedAt: '2021-11-26T03:53:43.493Z',
    images: [],
  },
];

describe('FilterProducts function', () => {
  it('Correctly filters array by category', () => {
    const actual = filterProducts(
      productsDto,
      'Clothing',
      sortTypes.NEW_FIRST,
      ''
    );

    expect(actual).toEqual(expected1);
  });
  it('Correctly filters array by filter', () => {
    const actual = filterProducts(
      productsDto,
      'All Categories',
      sortTypes.EXPENSIVE_FIRST,
      ''
    );

    expect(actual).toEqual(expected2);
  });
  it('Correctly filters array by search', () => {
    const actual = filterProducts(
      productsDto,
      'All Categories',
      sortTypes.CHEAP_FIRST,
      'metal'
    );

    expect(actual).toEqual(expected3);
  });
  it('Correctly filters array by category, filter and search', () => {
    const actual = filterProducts(
      productsDto,
      'Home',
      sortTypes.OLD_FIRST,
      'incredible'
    );

    expect(actual).toEqual(expected4);
  });
});
