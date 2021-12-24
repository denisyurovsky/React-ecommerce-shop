import { render } from '@testing-library/react';
import React from 'react';

import LoadingButton from '../LoadingButton';

describe('LoadingButton component', () => {
  it('should render a short button with a correct label', () => {
    const { asFragment } = render(<LoadingButton label="testing" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a full width btn with a correct label', () => {
    const { asFragment } = render(
      <LoadingButton label="testing" isFullWidth={true} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
