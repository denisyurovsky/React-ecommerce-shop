import { pathNames } from '../../../constants/pathNames';

export const sortTypes = {
  NEW_FIRST: 'new',
  OLD_FIRST: 'old',
  EXPENSIVE_FIRST: 'expensive',
  CHEAP_FIRST: 'cheap',
};

export const pageView = {
  MODULE_VIEW: 'module',
  LIST_VIEW: 'list',
};

export const sortObj = {
  [sortTypes.NEW_FIRST]: { field: 'createdAt', order: 'desc' },
  [sortTypes.OLD_FIRST]: { field: 'createdAt', order: 'asc' },
  [sortTypes.EXPENSIVE_FIRST]: { field: 'price', order: 'desc' },
  [sortTypes.CHEAP_FIRST]: { field: 'price', order: 'asc' },
};

export const BreadcrumbsLinks = [
  { url: '/', text: 'Home' },
  { url: pathNames.PRODUCTS, text: 'Products' },
];

export const NUMBER_ITEMS_ON_PAGE = 20;

export const MOBILE_WIDTH = 540;

export const defaultParams = {
  entity: 'products',
  filters: null,
  sort: sortObj[sortTypes.NEW_FIRST],
  currentPage: 1,
  itemsPerPage: NUMBER_ITEMS_ON_PAGE,
  q: '',
};
