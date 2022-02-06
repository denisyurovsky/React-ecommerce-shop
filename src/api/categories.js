import { http } from './setup';

export async function getAllCategories() {
  let response = await http.get('/categories');

  response = response.data.map((category) => category.name);

  return response;
}

export function deleteCategoryAndRelatedProducts(category) {
  return http.delete(`/categories/${category}`);
}
