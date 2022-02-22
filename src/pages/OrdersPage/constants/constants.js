import { pathNames } from '../../../helpers/constants/pathNames/pathNames';

const { PROFILE, ORDERS } = pathNames;

export const breadcrumbsLinks = [
  { url: '/', text: 'Home' },
  { url: PROFILE, text: 'Profile' },
  { url: `${PROFILE}${ORDERS}`, text: 'My orders' },
];
