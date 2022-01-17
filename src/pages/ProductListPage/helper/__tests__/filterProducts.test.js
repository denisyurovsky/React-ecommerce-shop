import productsDto from '../../../../test-utils/dto/productsDto';
import { sortTypes } from '../../constants/constants';
import filterProducts from '../filterProducts';

const expected1 = [productsDto[1], productsDto[4]];

const expected2 = [
  productsDto[5],
  productsDto[1],
  productsDto[0],
  productsDto[2],
  productsDto[4],
  productsDto[3],
];

const expected3 = [productsDto[3], productsDto[4]];

const expected4 = [productsDto[2], productsDto[3]];

describe('FilterProducts function', () => {
  it('Correctly filters array by category', () => {
    const actual = filterProducts(
      productsDto,
      'Clothing',
      sortTypes.NEW_FIRST,
      ''
    );

    expect(actual).toEqual(expected1);
  });
  it('Correctly filters array by filter', () => {
    const actual = filterProducts(
      productsDto,
      'All Categories',
      sortTypes.EXPENSIVE_FIRST,
      ''
    );

    expect(actual).toEqual(expected2);
  });
  it('Correctly filters array by search', () => {
    const actual = filterProducts(
      productsDto,
      'All Categories',
      sortTypes.CHEAP_FIRST,
      'metal'
    );

    expect(actual).toEqual(expected3);
  });
  it('Correctly filters array by category, filter and search', () => {
    const actual = filterProducts(
      productsDto,
      'Home',
      sortTypes.OLD_FIRST,
      'incredible'
    );

    expect(actual).toEqual(expected4);
  });
});
