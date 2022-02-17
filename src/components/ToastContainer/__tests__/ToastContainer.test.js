import userEvent from '@testing-library/user-event';
import React from 'react';
import { toast } from 'react-toastify';

import { BREAK_POINT } from '../../../helpers/constants/constants';
import render, { screen } from '../../../test-utils/renderWith';
import ToastContainer from '../ToastContainer';

const TestApp = () => (
  <>
    <button onClick={() => toast.success('success')}>Click me</button>
    <ToastContainer />
  </>
);

describe('ToastContainer component', () => {
  it('should implement correct margin-top on laptop', async () => {
    window.innerWidth = BREAK_POINT.SM + 10;
    render(<TestApp />);

    userEvent.click(screen.getByText('Click me'));
    expect(await screen.findByText('success')).toBeInTheDocument();
    const divs = document.getElementsByTagName('div');

    expect(divs[2]).toHaveStyle('margin-top: 0');
  });

  it('should implement correct margin-top on mobile', async () => {
    window.innerWidth = BREAK_POINT.SM - 10;
    render(<TestApp />);

    userEvent.click(screen.getByText('Click me'));
    expect(await screen.findByText('success')).toBeInTheDocument();
    const divs = document.getElementsByTagName('div');

    expect(divs[2]).toHaveStyle('margin-top: 60px');
  });
});
