export const MIN_PASSWORD_LENGTH = 2;

// export const LOCK_TIMEOUT = 5 * 60 * 1000;
export const LOCK_TIMEOUT = 1 * 60 * 1000;
export const MAX_LOGIN_ATTEMPTS = 5;

export const ERROR = {
  LOGIN: 'Incorrect password or email',
  LOCK: 'Many wrong attempts, try again later',
  REGISTER: 'User already exists, try to sign in',
};

export const authStatus = {
  PENDING: 'loading',
  FULFILLED: 'success',
  REJECTED: 'failure',
  IDLE: 'idle',
  LOCKED: 'locked',
};
