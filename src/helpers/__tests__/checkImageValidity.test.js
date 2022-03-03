import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import render from '../../test-utils/renderWith';
import checkImageValidity from '../checkImageValidity';

function App({ file }) {
  const [state, setState] = useState('Empty');

  const handleClick = () =>
    setState(checkImageValidity(file).result.toString());

  return (
    <>
      <h1>{state}</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

App.propTypes = {
  file: PropTypes.any,
};

describe('CheckImageValidity function', () => {
  it('should check incorrect extension', async () => {
    const file = new Blob(['Hello world.'], {
      type: 'text/plain;charset=utf-8',
    });

    render(<App file={file} />);
    userEvent.click(screen.getByRole('button', { name: /Click me/i }));
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should check correct extension', async () => {
    const file = new File(['image'], 'image.png');

    render(<App file={file} />);
    userEvent.click(screen.getByRole('button', { name: /Click me/i }));
    expect(screen.getByText('true')).toBeInTheDocument();
  });
});
