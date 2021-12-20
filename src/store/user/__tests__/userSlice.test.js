import reducer, { resetBlockedState } from '../userSlice';

const defaultState = {
  loginStatus: 'idle',
  user: {
    amountOfTries: 0,
  },
};

it('should reset locked state', () => {
  const previousState = {
    loginStatus: 'locked',
    user: {
      amountOfTries: 5,
    },
  };
  const newState = reducer(previousState, resetBlockedState());

  expect(newState).toEqual(defaultState);
});
