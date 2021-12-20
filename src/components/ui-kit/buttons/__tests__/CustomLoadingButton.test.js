import { render } from '@testing-library/react';
import React from 'react';

import CustomLoadingButton from '../CustomLoadingButton';

describe('CustomLoadingButton component', () => {
  it('should render a short button with a correct label', () => {
    const { asFragment } = render(<CustomLoadingButton label="testing" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a full width btn with a correct label', () => {
    const { asFragment } = render(
      <CustomLoadingButton label="testing" isFullWidth={true} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
