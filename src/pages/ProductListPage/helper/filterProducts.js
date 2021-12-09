import { sortTypes } from '../constants/constants';

const filterProducts = (products, category, sort, searchValue) => {
  const cbSort = {
    [sortTypes.NEW_FIRST]: () => (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt),
    [sortTypes.OLD_FIRST]: () => (a, b) =>
      new Date(a.createdAt) - new Date(b.createdAt),
    [sortTypes.EXPENSIVE_FIRST]: () => (a, b) => b.price - a.price,
    [sortTypes.CHEAP_FIRST]: () => (a, b) => a.price - b.price,
  };

  return products
    .filter((product) => {
      if (category === 'All Categories') return true;

      return product.category.name === category;
    })
    .filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort(cbSort[sort]());
};

export default filterProducts;
