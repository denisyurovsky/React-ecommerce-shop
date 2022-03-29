import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import productsDto from '../../../test-utils/dto/productsDto';
import { userWithEmptyCart } from '../../../test-utils/dto/userDto';
import userReducer from '../../user/userSlice';
import cartReducer, {
  addProduct,
  deleteProduct,
  decreaseProduct,
  deleteAllProducts,
  selectProduct,
  getCart,
  selectSellersProducts,
} from '../cartSlice';

const initialUser = { user: { id: 1 } };
const nonLoginedUser = { user: { id: null } };

const initialCart = {
  sellers: {},
  totalPrice: 0,
  totalQuantity: 0,
};

const cartWithProduct = {
  sellers: {
    2: {
      products: [
        { userId: 2, productId: 1, quantity: 1, checked: true, price: 790 },
      ],
      checked: true,
    },
  },
};

const getNewStore = (initCart = initialCart, initUser = initialUser) =>
  configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
    },
    preloadedState: {
      user: initUser,
      cart: initCart,
    },
  });

const getArrayKeysFromObject = (object) => Object.keys(object);

const successfulHandlers = [
  rest.delete('/cart', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.post('/guest/cart', (req, res, ctx) =>
    res(ctx.json({ cart: req.body.cart }))
  ),
  rest.put('/cart', (req, res, ctx) => {
    userWithEmptyCart.cart.sellers = req.body.cart.sellers;
    userWithEmptyCart.cart.totalPrice = req.body.cart.totalPrice;
    userWithEmptyCart.cart.totalQuantity = req.body.cart.totalQuantity;

    return res(ctx.status(200), ctx.json({ cart: req.body.cart }));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userWithEmptyCart));
  }),
];

const errorHandlers = [
  rest.put('/cart', (req, res, ctx) => res(ctx.status(404), ctx.json({}))),
  rest.get('/users/1', (req, res, ctx) => res(ctx.status(404), ctx.json({}))),
  rest.delete('/cart', (req, res, ctx) => res(ctx.status(404), ctx.json({}))),
];

const server = setupServer(...successfulHandlers);

describe('Cart actions', () => {
  describe('Correct server response', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('Should be able to add products', async () => {
      const store = getNewStore();

      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );

      expect(getArrayKeysFromObject(store.getState().cart.sellers).length).toBe(
        1
      );
    });

    it('Should be able to decrease products', async () => {
      const store = getNewStore(cartWithProduct);

      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );

      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to delete particular product', async () => {
      const store = getNewStore(cartWithProduct);

      await store.dispatch(
        deleteProduct({
          product: productsDto[1],
        })
      );

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to delete all products', async () => {
      const store = getNewStore(cartWithProduct);

      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[3],
        })
      );

      await store.dispatch(deleteAllProducts());

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to mark product', async () => {
      const store = getNewStore(cartWithProduct);

      await store.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );

      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(false);
    });

    it('Should be able to select products of one seller', async () => {
      const store = getNewStore(cartWithProduct);

      await store.dispatch(
        selectSellersProducts({
          sellerId: productsDto[1].userId,
        })
      );

      expect(
        store.getState().cart.sellers[productsDto[1].userId].checked
      ).toEqual(false);
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(false);
    });
  });

  describe('Non logined user', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('Should be able to add products', async () => {
      const store = getNewStore(initialCart, nonLoginedUser);

      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );

      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0]
          .productId
      ).toEqual(productsDto[1].id);
    });

    it('Should be able to decrease products', async () => {
      const store = getNewStore(cartWithProduct, nonLoginedUser);

      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );

      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to delete particular product', async () => {
      const store = getNewStore(cartWithProduct, nonLoginedUser);

      await store.dispatch(
        deleteProduct({
          product: productsDto[1],
        })
      );

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to delete all products', async () => {
      const store = getNewStore(cartWithProduct, nonLoginedUser);

      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[3],
        })
      );

      await store.dispatch(deleteAllProducts());

      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });

    it('Should be able to mark product', async () => {
      const store = getNewStore(cartWithProduct, nonLoginedUser);

      await store.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );

      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(false);
    });

    it('Should be able to select products of one seller', async () => {
      const store = getNewStore(cartWithProduct, nonLoginedUser);

      await store.dispatch(
        selectSellersProducts({
          sellerId: productsDto[1].userId,
        })
      );

      expect(
        store.getState().cart.sellers[productsDto[1].userId].checked
      ).toEqual(false);
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(false);
    });
  });

  describe('Server responds with error', () => {
    const errorServer = setupServer(...errorHandlers);

    beforeEach(() => errorServer.listen());
    afterEach(() => errorServer.close());

    it('Should be able to detect getCart error', async () => {
      const store = getNewStore();

      await store.dispatch(getCart());
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect addProduct error', async () => {
      const store = getNewStore();

      await store.dispatch(addProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect decreaseProduct error', async () => {
      const store = getNewStore();

      await store.dispatch(decreaseProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect deleteProduct error', async () => {
      const store = getNewStore();

      await store.dispatch(deleteProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect markProoduct error', async () => {
      const store = getNewStore();

      await store.dispatch(selectProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect deleteAllProducts error', async () => {
      const store = getNewStore();

      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect selectSellersProducts error', async () => {
      const store = getNewStore();

      await store.dispatch(selectSellersProducts({ sellerId: 1 }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
  });
});
