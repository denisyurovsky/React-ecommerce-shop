import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

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
      const { asFragment } = render(<Header />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('resize tests', () => {
    it('renders correctly under 700px', () => {
      window.innerWidth = 600;
      act(() => {
        render(<Header />);
      });
      expect(screen.getByTestId('burger-button')).toBeInTheDocument();
    });

    it('renders correctly after 700px', () => {
      window.innerWidth = 800;
      act(() => {
        render(<Header />);
      });
      expect(screen.getByTestId('header-navigation-list')).toBeInTheDocument();
    });
  });
});
