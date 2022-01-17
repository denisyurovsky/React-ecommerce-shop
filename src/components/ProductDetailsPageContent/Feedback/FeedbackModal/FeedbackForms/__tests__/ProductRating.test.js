import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import getStarByNumber from '../getStarByNumber';
import ProductRating from '../ProductRating';

describe('CustomRating snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(
      <ProductRating value={0} onChange={() => {}} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Clicks change state', () => {
  const callback = jest.fn();

  beforeEach(() => {
    render(<ProductRating onChange={callback} value={2} />);
  });

  it('should render a valid value', () => {
    expect(screen.queryAllByTestId('StarIcon')).toHaveLength(2);
  });

  it('should call onChange function after change in state', () => {
    const star = getStarByNumber(1);

    fireEvent.click(star);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('Default state:', () => {
  it('should not mark any star if value equals to 0', () => {
    render(<ProductRating onChange={() => {}} value={0} />);

    expect(screen.queryAllByTestId('StarRateIcon')).toHaveLength(5);
  });
});

describe('Correct text:', () => {
  describe('onClick:', () => {
    it('should show "awful"', () => {
      const { getByText } = render(
        <ProductRating onChange={() => {}} value={1} />
      );

      expect(getByText(/awful/i)).toBeInTheDocument();
    });

    it('should show "bad"', () => {
      const { getByText } = render(
        <ProductRating onChange={() => {}} value={2} />
      );

      expect(getByText(/bad/i)).toBeInTheDocument();
    });

    it('should show "ok"', () => {
      const { getByText } = render(
        <ProductRating onChange={() => {}} value={3} />
      );

      expect(getByText(/ok/i)).toBeInTheDocument();
    });

    it('should show "good"', () => {
      const { getByText } = render(
        <ProductRating onChange={() => {}} value={4} />
      );

      expect(getByText(/good/i)).toBeInTheDocument();
    });

    it('should show "excellent"', () => {
      const { getByText } = render(
        <ProductRating onChange={() => {}} value={5} />
      );

      expect(getByText(/excellent/i)).toBeInTheDocument();
    });
  });
});
