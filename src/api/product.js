import { http } from './setup';

export const getProduct = async (productId) => {
  let product;
  let user;
  let userId;

  try {
    product = await http.get(`products/${productId}`);
    userId = product.data.userId;
    user = await http.get(`users?id=${userId}`);
  } catch (err) {
    throw new Error(err);
  }

  if (!user.data || user.data.length === 0) {
    throw new Error(`User with ID ${userId} was not found`);
  }

  const { firstName, lastName } = user.data[0];

  return {
    ...product.data,
    author: {
      firstName,
      lastName,
    },
  };
};
