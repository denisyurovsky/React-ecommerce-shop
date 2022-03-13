import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DESCRIPTION_ERROR, LENGTH_ERROR } from '../../constants';
import NameInput from '../NameInput';

describe('Props tests', () => {
  it('should be able to change value', () => {
    const cb = jest.fn();
    const text = 'test';

    render(<NameInput value="" onChange={cb} disableSubmit={() => {}} />);

    const input = screen.getByLabelText(/name/i);

    userEvent.type(input, text);

    expect(input).toHaveValue(text);
    expect(cb).toHaveBeenCalledTimes(text.length);
  });

  it('should be able to call error cb after wrong symbols', () => {
    const cb = jest.fn();

    render(<NameInput value="" onChange={() => {}} disableSubmit={cb} />);

    userEvent.type(screen.getByLabelText(/name/i), 'ф');

    expect(cb).toHaveBeenCalledTimes(1);
    expect(screen.getByText(DESCRIPTION_ERROR)).toBeInTheDocument();
  });

  it('should call cb for length error', () => {
    const cb = jest.fn();

    render(<NameInput value="f" onChange={() => {}} disableSubmit={cb} />);

    userEvent.type(screen.getByLabelText(/name/i), '{backspace}');

    expect(cb).toHaveBeenCalledTimes(1);
    expect(screen.getByText(LENGTH_ERROR)).toBeInTheDocument();
  });
});
