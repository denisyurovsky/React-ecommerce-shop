import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ImagesInput from '../ImagesInput';

const correctFile = new File(['(⌐□_□)'], 'cropped.png', { type: 'image/png' });
const incorrectFile = new File(['(⌐□_□)'], '1.txt');

describe('Props tests', () => {
  const onChange = jest.fn();
  const disableSubmit = jest.fn();

  beforeEach(() => {
    render(
      <ImagesInput
        value={[]}
        onChange={onChange}
        disableSubmit={disableSubmit}
      />
    );
  });

  it('should return converted images', async () => {
    userEvent.upload(screen.getByLabelText(/^choose/i), correctFile);

    expect(disableSubmit).toHaveBeenCalled();
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        'data:image/png;base64,KOKMkOKWoV/ilqEp',
      ]);
    });
  });

  it('should not call cb with wrong formatted img', () => {
    userEvent.upload(screen.getByLabelText(/^choose/i), incorrectFile);

    expect(disableSubmit).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });
});
