import productsDto from '../../../test-utils/dto/productsDto';
import initialState from '../initialState';
import reducer, { addProducts } from '../productsSlice';

describe('Products actions', () => {
  it('Should be able to add products', async () => {
    const newState = reducer(initialState, addProducts(productsDto));

    expect(newState.data).toEqual(productsDto);
  });
});
