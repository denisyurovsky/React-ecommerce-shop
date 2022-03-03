import { pathNames } from '../../../constants/pathNames';

export const MODAL_TYPE = {
  EDIT: 'edit',
  ADD: 'add',
};

export const EMPTY_ADDRESS = {
  title: '',
  name: '',
  surname: '',
  country: { name: '', id: '' },
  city: '',
  street: '',
  building: '',
  flat: '',
  phone: '',
  zip: '',
};

const { PROFILE, ADDRESSBOOK } = pathNames;

export const LINKS = [
  { url: '/', text: 'Home' },
  { url: PROFILE, text: 'Profile' },
  {
    url: `${PROFILE}${ADDRESSBOOK}`,
    text: 'Address book',
  },
];

export const RUSSIA = 'Russian Federation';
