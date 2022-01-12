import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import CardShapeToggle from '../CardShapeToggle';

describe('CardShapeToggle component', () => {
  describe('should render a valid snapshots', () => {
    it('renders a valid snapshot', () => {
      const setCardShape = jest.fn();
      const { asFragment } = render(
        <CardShapeToggle
          cardShape={pageView.LIST_VIEW}
          setCardShape={setCardShape}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('module toggle button works properly', () => {
      let cardShape = pageView.LIST_VIEW;
      const setCardShape = jest.fn(
        (newCardShape) => (cardShape = newCardShape)
      );

      render(
        <CardShapeToggle cardShape={cardShape} setCardShape={setCardShape} />
      );
      const moduleButton = screen.getByRole('button', { name: /module/i });

      userEvent.click(moduleButton);
      expect(cardShape).toEqual(pageView.MODULE_VIEW);
    });
    it('list toggle button works properly', () => {
      let cardShape = pageView.MODULE_VIEW;
      const setCardShape = jest.fn(
        (newCardShape) => (cardShape = newCardShape)
      );

      render(
        <CardShapeToggle cardShape={cardShape} setCardShape={setCardShape} />
      );
      const listButton = screen.getByRole('button', { name: /list/i });

      userEvent.click(listButton);
      expect(cardShape).toEqual(pageView.LIST_VIEW);
    });
  });
});
