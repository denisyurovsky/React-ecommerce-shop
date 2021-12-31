import React from 'react';

import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import { Header } from '../Header';

const testWidth = 700;

const spy = jest.fn();

beforeAll(() => {
  window.addEventListener('resize', spy);
});

it('does not fire resize event by default', () => {
  expect(spy).not.toHaveBeenCalled();
  expect(window.innerWidth).not.toBe(testWidth);
});

afterAll(() => {
  window.removeEventListener('resize', spy);
});

describe('Header component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<Header />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('resize tests', () => {
    it('renders correctly under 700px', () => {
      window.innerWidth = 600;
      renderWithStore(<Header />);

      expect(screen.getByTestId('burger-button')).toBeInTheDocument();
    });

    it('renders correctly after 700px', () => {
      window.innerWidth = 800;
      renderWithStore(<RouterConnected component={<Header />} />);

      expect(screen.getByTestId('header-navigation-list')).toBeInTheDocument();
    });
  });
});
