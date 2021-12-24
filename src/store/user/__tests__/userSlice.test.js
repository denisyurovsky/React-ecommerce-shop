import reducer, { resetBlockedState, resetError } from '../userSlice';

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

it('should reset error state', () => {
  const previousState = {
    loginStatus: 'failure',
    user: {
      amountOfTries: 3,
    },
  };
  const newState = reducer(previousState, resetError());

  expect(newState).toEqual({
    loginStatus: 'idle',
    registerStatus: 'idle',
    user: {
      amountOfTries: 3,
    },
  });
});
