// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createBrowserHistory } from 'history';

jest.setTimeout(15000);
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
window.URL.createObjectURL = () => 'blob:http://someURL';
window.URL.revokeObjectURL = () => {};

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (address) => {
    createBrowserHistory().push(address);
  },
}));
