import { Countries } from '../../ts/models/countries.model';

const initialState = {
  data: [] as Countries[],
  isLoading: false,
  errorOccurred: false,
  errorMessage: '',
};

export default initialState;
