import { shape, string } from 'prop-types';

const addressType = shape({
  title: string.isRequired,
  name: string.isRequired,
  surname: string.isRequired,
  phone: string.isRequired,
  country: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
  city: string.isRequired,
  street: string.isRequired,
  building: string.isRequired,
  flat: string.isRequired,
  zip: string.isRequired,
});

export default addressType;
