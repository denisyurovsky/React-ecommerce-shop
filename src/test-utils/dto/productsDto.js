const productsDto = [
  {
    id: 0,
    userId: 1,
    name: 'Intelligent Cotton Pants',
    price: 670,
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    category: {
      id: 0,
      name: 'Home',
    },
    author: {
      id: 'eded1d04-20ea-4196-af68-3b452acd600c',
      firstName: 'Lindsay',
      lastName: 'Yundt',
    },
    createdAt: '2021-11-10T17:35:05.565Z',
    updatedAt: '2021-11-24T02:22:24.505Z',
    rating: 4,
    images: [],
  },
  {
    id: 1,
    userId: 2,
    name: 'Incredible Plastic Table',
    price: 790,
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: 1,
      name: 'Clothing',
    },
    author: {
      id: '3186fb76-80c8-40a2-8cf0-9ee8272ec668',
      firstName: 'Cassandra',
      lastName: "O'Hara",
    },
    createdAt: '2021-04-17T07:18:07.870Z',
    updatedAt: '2021-10-14T17:03:47.317Z',
    rating: 5,
    images: [],
  },
  {
    id: 2,
    userId: 3,
    name: 'Incredible Rubber Cheese',
    price: 638,
    description:
      '{"blocks":[{"key":"3f307","text":"Boston\'s most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7irup","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category: {
      id: 0,
      name: 'Home',
    },
    author: {
      id: '3cec940c-9259-480e-b57e-c9704edb8f12',
      firstName: 'Jany',
      lastName: 'Collins',
    },
    createdAt: '2021-01-09T11:29:45.814Z',
    updatedAt: '2021-05-12T04:43:57.783Z',
    rating: 4,
    images: [],
  },
  {
    id: 3,
    userId: 4,
    name: 'Incredible Metal Shoes',
    price: 670,
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    category: {
      id: 0,
      name: 'Home',
    },
    author: {
      id: '9f6850dc-43bc-4966-9cb6-8625021e0e1c',
      firstName: 'Dangelo',
      lastName: 'Morissette',
    },
    createdAt: '2021-03-18T07:51:04.578Z',
    updatedAt: '2021-11-26T03:53:43.493Z',
    rating: 3,
    images: [],
  },
  {
    id: 4,
    userId: 5,
    name: 'Incredible Metal Chair',
    price: 130,
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    category: {
      id: 1,
      name: 'Clothing',
    },
    author: {
      id: '107d9c97-58f1-4926-883b-ea7421c53a13',
      firstName: 'Austen',
      lastName: 'Romaguera',
    },
    createdAt: '2021-03-29T04:41:15.527Z',
    updatedAt: '2021-04-07T13:31:55.867Z',
    rating: 2.5,
    images: [],
  },
  {
    id: 5,
    userId: 6,
    name: 'Fantastic Concrete Computer',
    price: 805,
    discountPrice: 804,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    category: {
      id: 2,
      name: 'Games',
    },
    author: {
      id: '3e0ae647-2908-47ec-a569-f025212b8007',
      firstName: 'Unique',
      lastName: 'Willms',
    },
    createdAt: '2021-10-16T05:33:02.583Z',
    updatedAt: '2021-10-20T04:05:37.000Z',
    rating: 1,
    images: [],
  },
];

export default productsDto;

export const productForPDP = {
  id: 6,
  userId: 1,
  name: 'Intelligent Cotton Pants',
  price: 670,
  description:
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
  category: {
    id: 0,
    name: 'Home',
  },
  createdAt: '2021-11-10T17:35:05.565Z',
  updatedAt: '2021-11-24T02:22:24.505Z',
  images: [],
};

export const CheckoutPageProducts = [
  {
    id: 10,
    userId: 1,
    name: 'Unbranded Concrete Gloves',
    price: 917,
    discountPrice: 679,
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    category: {
      id: 5,
      name: 'Music',
    },
    rating: null,
    images: [],
    createdAt: '2022-03-02T07:07:28.164Z',
    updatedAt: '2022-03-02T21:18:41.335Z',
  },
  {
    id: 24,
    userId: 1,
    name: 'Sleek Concrete Computer',
    price: 108,
    discountPrice: 27,
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    category: {
      id: 2,
      name: 'Clothing',
    },
    rating: 2,
    images: [],
    createdAt: '2022-03-02T02:37:44.721Z',
    updatedAt: '2022-03-04T23:38:49.049Z',
  },
  {
    id: 33,
    userId: 2,
    name: 'Licensed Rubber Cheese',
    price: 40,
    discountPrice: null,
    description: 'The Football Is Good For Training And Recreational Purposes',
    category: {
      id: 4,
      name: 'Books',
    },
    rating: 4,
    images: [],
    createdAt: '2022-03-02T14:03:05.569Z',
    updatedAt: '2022-03-07T00:00:24.450Z',
  },
  {
    id: 50,
    userId: 2,
    name: 'Gorgeous Frozen Car',
    price: 787,
    discountPrice: null,
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    category: {
      id: 1,
      name: 'Industrial',
    },
    rating: null,
    images: [],
    createdAt: '2022-03-09T05:15:26.347Z',
    updatedAt: '2022-03-09T08:18:45.254Z',
  },
];
