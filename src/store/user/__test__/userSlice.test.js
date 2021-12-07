import initialState from '../initialState';
import reducer, { signIn, signOut } from '../userSlice';

const signInState = {
  id: 1,
  firstName: 'Admin',
  lastName: 'Test',
  email: 'test@test.com',
  isAdmin: true,
};

describe('User actions', () => {
  it('Should sign in', () => {
    const newState = reducer(initialState, signIn(signInState));

    expect(newState).toEqual(signInState);
  });
  it('Should sing out', () => {
    const newState = reducer(signInState, signOut());

    expect(newState).toEqual(initialState);
  });
});
