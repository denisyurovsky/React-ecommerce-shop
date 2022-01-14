import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import CardShapeToggle from '../CardShapeToggle';

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setFilterProperties = jest.fn();
      const { asFragment } = render(
        <CardShapeToggle setFilterProperties={setFilterProperties} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('toggle works properly', () => {
      let data;
      const setFilterProperties = jest.fn((func) => (data = func()));

      render(<CardShapeToggle setFilterProperties={setFilterProperties} />);
      const leftButton = screen.getAllByRole('button')[0];
      const rightButton = screen.getAllByRole('button')[1];

      expect(leftButton).toHaveAttribute('aria-pressed', 'true');
      expect(rightButton).toHaveAttribute('aria-pressed', 'false');
      userEvent.click(rightButton);
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
      expect(rightButton).toHaveAttribute('aria-pressed', 'true');
      userEvent.click(rightButton);
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
      expect(rightButton).toHaveAttribute('aria-pressed', 'true');
      expect(data.cardShape).toEqual(pageView.MODULE_VIEW);
    });
  });
});
