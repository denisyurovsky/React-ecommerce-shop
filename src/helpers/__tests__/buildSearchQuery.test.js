import buildSearchQuery from '../buildSearchQuery';

describe('buildSearchQuery function', () => {
  it('Should return default search query', () => {
    const actual = buildSearchQuery('products');
    const expected = '/products';

    expect(actual).toEqual(expected);
  });
  it('Should return search query with sort, currentPage, itemsPerPage params', () => {
    const actual = buildSearchQuery(
      'products',
      null,
      { field: 'createdAt', order: 'desc' },
      null,
      1,
      20
    );
    const expected = '/products?_sort=createdAt&_order=desc&_page=1&_limit=20';

    expect(actual).toEqual(expected);
  });
  it('Should return search query with filter params', () => {
    const actual = buildSearchQuery(
      'products',
      [{ id: 1 }, { id: 3 }, { id: 6 }],
      null,
      null
    );
    const expected = '/products?id=1&id=3&id=6';

    expect(actual).toEqual(expected);
  });
  it('Should return search query with sort, filter, text, currentPage, itemsPerPage params', () => {
    const actual = buildSearchQuery(
      'products',
      [{ 'category.name': 'Music' }, { userId: 2 }],
      { field: 'createdAt', order: 'asc' },
      'car',
      2,
      10
    );
    const expected =
      '/products?category.name=Music&userId=2&_sort=createdAt&_order=asc&q=car&_page=2&_limit=10';

    expect(actual).toEqual(expected);
  });
});
