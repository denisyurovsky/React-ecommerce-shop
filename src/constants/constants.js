export const notificationError =
  'Something went wrong. Please try again later.';

export const NUMBER_OF_CARDS_ON_HOMEPAGE = 5;

export const USER_ROLE = {
  ADMIN: 'admin',
  SELLER: 'seller',
  CONSUMER: 'consumer',
  GUEST: 'guest',
};

export const FETCH = {
  PENDING: 'loading',
  FULFILLED: 'success',
  REJECTED: 'failure',
  IDLE: 'idle',
};

export const REQUEST_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  IDLE: 'idle',
};

export const ALL_CATEGORIES = 'All Categories';

export const EMPTY = {
  NO_COMMENTS_BE_THE_FIRST:
    'There are no comments yet. Be the first to review.',
  NO_COMMENTS_FROM_USER: 'There are no comments from this user.',
};

export const ERROR = {
  SOMETHING_WENT_WRONG: notificationError,
  LOAD_FEEDBACK: 'Failed to load feedbacks.',
  INVALID_FIELDS: 'Failed. One or more fields were invalid.',
};

export const SUCCESS = {
  ADDRESS_ADDED: 'Address was successfully added.',
  ADDRESS_EDITED: 'Address was successfully edited.',
};

export const KEYS = {
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  TAB: 'Tab',
  ESCAPE: 'Escape',
};

export const BREAK_POINT = {
  CART: 500,
  SM: 600,
  LAPTOP: 700,
  MD: 900,
};

export const PROFILE_MENU_FROM_TOP = 145;

export const CHECK_TOKEN_EXPIRATION_FREQUENCY = 30000;

export const MODAL_SIZES = {
  NORMAL: 'normal',
  SMALL: 'small',
};

export const HEADER_HEIGHT = 60;

export const defaultFilters = [
  { isDiscounted: false },
  { 'category.name': null },
  { userId: null },
];
