import { Category } from './../ts/models/category.model';
import { http } from './setup';

const categoriesApi = {
  async get() {
    const data: Category[] = await http
      .get('/categories')
      .then((res) => res.data);

    const categories: string[] = data.map(
      (category: Category) => category.name
    );

    return categories;
  },
  deleteCategoryAndRelatedProducts(category: Category) {
    return http.delete<void>(`/categories/${category}`);
  },
};

export default categoriesApi;
