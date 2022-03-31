import { Address } from '../../ts/models/addresses.model';

const initialState = {
  data: [] as Address[],
  isLoading: false,
  errorOccurred: false,
  errorMessage: '',
};

export default initialState;
