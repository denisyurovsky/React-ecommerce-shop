import { AxiosResponse } from 'axios';

import convertDescription from '../helpers/convertDescriptionToObj';

import { Product } from './../ts/models/product.model';
import { User } from './../ts/models/user.model';
import { http } from './setup';

const productApi = {
  async get(productId: number) {
    let product: AxiosResponse;
    let user: AxiosResponse;
    let userId: number;

    try {
      product = await http.get<Product>(`products/${productId}`);
      userId = product.data.userId;
      user = await http.get<User>(`users?id=${userId}`);
    } catch (err: any) {
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
  },
  delete(id: number) {
    return http.delete<void>(`/products/${id}`);
  },
  update(id: number, editedProduct: Product) {
    return http.patch<Product>(`products/${id}`, editedProduct);
  },
  create(product: Product) {
    return http.post<Product>('/products', product);
  },
};

export default productApi;
