import { createBrowserHistory } from 'history';

function makeLogout() {
  createBrowserHistory().push('/');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('cart');
  location.reload();
}

export default makeLogout;
