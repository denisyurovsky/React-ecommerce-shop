import {
  render,
  screen,
  fireEvent,
  createEvent,
  getByRole,
} from '@testing-library/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DESCRIPTION_ERROR } from '../../constants';
import DescriptionEditor from '../DescriptionEditor';

const emptyState = EditorState.createEmpty();

const getTextArea = () =>
  getByRole(screen.getByText(/description/i).parentNode, 'textbox');

const pasteText = (text) =>
  createEvent.paste(getTextArea(), {
    clipboardData: {
      types: ['text/plain'],
      getData: () => text,
    },
  });

describe('Props tests', () => {
  it('should be able to change value', () => {
    const cb = jest.fn();

    window.location = '/admin/products/create';
    render(
      <DescriptionEditor
        value={emptyState}
        onChange={cb}
        disableSubmit={() => {}}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent(getTextArea(), pasteText('something'));

    expect(cb).toHaveBeenCalled();
  });

  it('should be able to call error callback', () => {
    const cb = jest.fn();

    window.location = '/admin/products/create';
    render(
      <DescriptionEditor
        value={emptyState}
        onChange={() => {}}
        disableSubmit={cb}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent(getTextArea(), pasteText('ф'));

    expect(cb).toHaveBeenCalledTimes(1);
    expect(screen.getByText(DESCRIPTION_ERROR)).toBeInTheDocument();
  });
});
