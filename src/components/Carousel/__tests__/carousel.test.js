import { render, screen } from '@testing-library/react';
import React from 'react';

import Carousel from '../Carousel';

const emptyArrayOfImages = [];
const singleImage = ['/img_01.jpg'];
const setOfImages = [
  '/img_01.jpg',
  '/img_02.jpg',
  '/img_03.jpg',
  '/img_04.jpg',
];

describe('Carousel component', () => {
  describe('correct render in dependency on quantity of images', () => {
    it('snapshots renders a image with empty array', () => {
      const { asFragment } = render(<Carousel images={emptyArrayOfImages} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('snapshots renders a single image', () => {
      const { asFragment } = render(<Carousel images={singleImage} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('snapshots renders a set of images', () => {
      const { asFragment } = render(<Carousel images={setOfImages} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('correct render in dependency on screen width', () => {
    const testWidth = 600;
    const spy = jest.fn();

    beforeAll(() => {
      window.addEventListener('resize', spy);
    });

    it('does not fire resize event by default', () => {
      expect(spy).not.toHaveBeenCalled();
      expect(window.innerWidth).not.toBe(testWidth);
    });

    afterAll(() => {
      window.removeEventListener('resize', spy);
    });

    describe('snapshots', () => {
      it('renders a valid snapshot with default size 600px', () => {
        const { asFragment } = render(<Carousel images={singleImage} />);

        expect(asFragment()).toMatchSnapshot();
      });
    });

    describe('when resize event is fired', () => {
      it('renders correctly under 600px', () => {
        window.innerWidth = 375;
        render(<Carousel images={singleImage} />);
        expect(screen.getByTestId('bottom')).toBeInTheDocument();
      });

      it('renders correctly after 600px', () => {
        window.innerWidth = 800;
        render(<Carousel images={singleImage} />);
        expect(screen.getByTestId('left')).toBeInTheDocument();
      });
    });
  });
});
