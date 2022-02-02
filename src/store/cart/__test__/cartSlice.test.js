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

const initialUser = {
  user: {
    id: 1,
  },
};

const nonLoginedUser = {
  user: {
    id: null,
  },
};

const initialCart = {
  sellers: {},
  totalPrice: 0,
  totalQuantity: 0,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState: {
    user: initialUser,
    cart: initialCart,
  },
});

const nonServerStore = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCart,
    user: nonLoginedUser,
  },
});

const successfulHandlers = [
  rest.put('/cart/1', (req, res, ctx) => {
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
  rest.put('/cart/1', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
];

const server = setupServer(...successfulHandlers);

const getArrayKeysFromObject = (object) => {
  return Array.from(Object.keys(object));
};

describe('Cart actions', () => {
  describe('Correct server response', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    it('Should be able to add products', async () => {
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
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
      await store.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0]
          .quantity
      ).toEqual(2);
      expect(
        store.getState().cart.sellers[productsDto[2].userId].products[0]
          .quantity
      ).toEqual(2);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0]
          .quantity
      ).toEqual(1);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[2].userId].products[0]
          .quantity
      ).toEqual(1);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to delete particular product', async () => {
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0]
          .quantity
      ).toEqual(1);
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
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
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
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0]
          .quantity
      ).toEqual(1);
      expect(
        store.getState().cart.sellers[productsDto[2].userId].products[0]
          .quantity
      ).toEqual(1);
      expect(
        store.getState().cart.sellers[productsDto[3].userId].products[0]
          .quantity
      ).toEqual(1);
      await store.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to mark product', async () => {
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(true);
      await store.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(false);
      await store.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to select products of one seller', async () => {
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        store.getState().cart.sellers[productsDto[1].userId].checked
      ).toEqual(true);
      expect(
        store.getState().cart.sellers[productsDto[1].userId].products[0].checked
      ).toEqual(true);
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
      await store.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(store.getState().cart.sellers).length
      ).toEqual(0);
    });
  });
  describe('Non logined user', () => {
    it('Should be able to add products', async () => {
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].productId
      ).toEqual(productsDto[1].id);
    });
    it('Should be able to decrease products', async () => {
      await nonServerStore.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].quantity
      ).toEqual(2);
      expect(
        nonServerStore.getState().cart.sellers[productsDto[2].userId]
          .products[0].quantity
      ).toEqual(2);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].quantity
      ).toEqual(1);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[2].userId]
          .products[0].quantity
      ).toEqual(1);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to delete particular product', async () => {
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].quantity
      ).toEqual(1);
      await nonServerStore.dispatch(
        deleteProduct({
          product: productsDto[1],
        })
      );
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to delete all products', async () => {
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[3],
        })
      );
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(3);
      await nonServerStore.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to mark product', async () => {
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].checked
      ).toEqual(true);
      await nonServerStore.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].checked
      ).toEqual(false);
      await nonServerStore.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
    });
    it('Should be able to select products of one seller', async () => {
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId].checked
      ).toEqual(true);
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].checked
      ).toEqual(true);
      await nonServerStore.dispatch(
        selectSellersProducts({
          sellerId: productsDto[1].userId,
        })
      );
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId].checked
      ).toEqual(false);
      expect(
        nonServerStore.getState().cart.sellers[productsDto[1].userId]
          .products[0].checked
      ).toEqual(false);
      await nonServerStore.dispatch(deleteAllProducts());
      expect(
        getArrayKeysFromObject(nonServerStore.getState().cart.sellers).length
      ).toEqual(0);
    });
  });
  describe('Server responds with error', () => {
    const errorServer = setupServer(...errorHandlers);

    beforeEach(() => {
      errorServer.listen();
    });

    afterEach(async () => {
      errorServer.close();
      server.listen();
      await store.dispatch(getCart());
      server.close();
    });

    beforeEach(() => {});
    it('Should be able to detect getCart error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(getCart());
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect addProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(addProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect decreaseProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(decreaseProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect deleteProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(deleteProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect markProoduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(selectProduct({ product: productsDto[1] }));
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect deleteAllProducts error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.isLoading).toEqual(false);
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect selectSellersProducts error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(selectSellersProducts({ sellerId: 1 }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
  });
});
