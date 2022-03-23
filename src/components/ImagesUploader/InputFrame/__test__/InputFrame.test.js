import { render, screen } from '@testing-library/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { InputFrame } from '../InputFrame';

const imagesValidityCase1 = {
  result: true,
  message: '',
};
const imagesValidityCase2 = {
  result: false,
  message: 'same message',
};

describe('InputFrame component', () => {
  it('renders component with default message', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <InputFrame
          imagesValidity={imagesValidityCase1}
          handleImageChange={() => {}}
          handleImageDrop={() => {}}
        />
      </DndProvider>
    );
    expect(screen.getByText(/choose images to upload/i)).toBeInTheDocument();
  });
  it('renders component with error message', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <InputFrame
          imagesValidity={imagesValidityCase2}
          handleImageChange={() => {}}
          handleImageDrop={() => {}}
        />
      </DndProvider>
    );
    expect(screen.getByText(imagesValidityCase2.message)).toBeInTheDocument();
  });
});
