import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  croppedWithState,
  unCroppedWithState,
  croppingWithState,
} from '../../../../test-utils/images/images';
import Wrapper from '../test-utils/Wrapper';

describe('FilesList component', () => {
  it('renders empty component without data', () => {
    const { asFragment } = render(<Wrapper />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component with data', () => {
    const { asFragment } = render(<Wrapper files={[unCroppedWithState]} />);
    const imgItem = screen.getByTestId('imgItem');

    expect(screen.getByTestId('imgItem')).toBeInTheDocument();
    expect(imgItem).toHaveTextContent('unCropped.png');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render spinner on load', () => {
    render(<Wrapper files={[unCroppedWithState]} isLoad={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  describe('callback functionality', () => {
    const deleteCallback = jest.fn();
    const changeCallback = jest.fn();

    beforeEach(() => {
      render(
        <Wrapper
          files={[croppedWithState, unCroppedWithState]}
          handleDelete={deleteCallback}
          setCroppedImage={changeCallback}
        />
      );
    });

    it('should be able to set images for crop', () => {
      userEvent.click(screen.getByText('unCropped.png', { exact: false }));
      expect(changeCallback).toHaveBeenCalledWith(croppedWithState.file);
    });

    it('should be able to delete images', () => {
      userEvent.click(screen.getAllByTestId('DeleteIcon')[0]);
      expect(deleteCallback).toHaveBeenCalledTimes(1);
    });
  });

  it('should style cropped images', () => {
    render(<Wrapper files={[croppedWithState]} />);

    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
  });

  it('should style cropping images', () => {
    render(<Wrapper files={[croppingWithState]} />);

    expect(screen.getByTestId('CropIcon')).toBeInTheDocument();
  });
});
