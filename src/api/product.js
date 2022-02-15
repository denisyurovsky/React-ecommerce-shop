import convertDescription from '../helpers/convertDescriptionToObj';

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

  const { firstName, lastName, avatar } = user.data[0];
  const description = convertDescription(product.data.description);

  return {
    ...product.data,
    description,
    author: {
      firstName,
      lastName,
      avatar,
    },
  };
};

export const deleteProduct = (id) => {
  return http.delete(`/products/${id}`);
};

export const updateProduct = (id, editedProduct) =>
  http.patch(`products/${id}`, editedProduct);

export const createProduct = (product) => http.post('/products', product);
