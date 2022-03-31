import categoriesDto from '../../../test-utils/dto/categoriesDto';
import reducer, { addCategories } from '../categoriesSlice';
import initialState from '../initialState';

describe('Products actions', () => {
  it('Should be able to add products', () => {
    const newState = reducer(initialState, addCategories(categoriesDto));

    expect(newState.data).toEqual(categoriesDto);
  });
});
