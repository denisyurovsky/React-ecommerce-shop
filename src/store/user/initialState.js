const initialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isAdmin: false,
    amountOfTries: null,
  },
  loginStatus: 'idle',
  registerStatus: 'idle',
  error: '',
};

export default initialState;
