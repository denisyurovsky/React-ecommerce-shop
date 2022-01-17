import { screen } from '@testing-library/react';

const getStarByNumber = (number) => {
  const name = `${number} Star${number > 1 ? 's' : ''}`;

  return screen.getByRole('radio', { name });
};

export default getStarByNumber;
