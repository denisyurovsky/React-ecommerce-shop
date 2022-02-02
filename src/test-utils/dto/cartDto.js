export const testCart = {
  sellers: {
    1: {
      products: [
        {
          userId: 1,
          productId: 36,
          quantity: 1,
          checked: true,
          price: 724,
          discountPrice: null,
        },
      ],
      checked: true,
    },
    3: {
      products: [
        {
          userId: 3,
          productId: 23,
          quantity: 1,
          checked: true,
          price: 891,
          discountPrice: null,
        },
        {
          userId: 3,
          productId: 28,
          quantity: 1,
          checked: true,
          price: 210,
          discountPrice: 100,
        },
        {
          userId: 3,
          productId: 6,
          quantity: 1,
          checked: true,
          price: 510,
          discountPrice: 400,
        },
      ],
      checked: true,
    },
    4: {
      products: [
        {
          userId: 4,
          productId: 10,
          quantity: 1,
          checked: true,
          price: 757,
          discountPrice: null,
        },
      ],
      checked: true,
    },
  },
  totalPrice: 3092,
  totalDiscountPrice: 2872,
  totalQuantity: 5,
  isLoading: false,
  errorOccurred: false,
};

export const checkoutCart = {
  sellers: {
    1: {
      products: [
        {
          userId: 1,
          productId: 10,
          quantity: 1,
          checked: true,
          price: 917,
          discountPrice: 679,
        },
        {
          userId: 1,
          productId: 24,
          quantity: 1,
          checked: true,
          price: 108,
          discountPrice: 27,
        },
      ],
      checked: true,
    },
    2: {
      products: [
        {
          userId: 2,
          productId: 50,
          quantity: 1,
          checked: true,
          price: 787,
          discountPrice: null,
        },
        {
          userId: 2,
          productId: 33,
          quantity: 2,
          checked: true,
          price: 40,
          discountPrice: null,
        },
      ],
      checked: true,
    },
  },
  totalPrice: 1892,
  totalDiscountPrice: 1573,
  totalQuantity: 5,
  isLoading: false,
  errorOccurred: false,
  errorMessage: '',
};
