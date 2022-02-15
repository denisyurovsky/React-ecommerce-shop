import { render, screen } from '@testing-library/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FilesList } from '../FilesList';

const file1 = new File(['(⌐□_□)'], 'image_1.png', { type: 'image/png' });

describe('FileList component', () => {
  it('renders empty component without data', () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <FilesList filesList={[]} handleImageDelete={() => {}} />
      </DndProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  it('renders component with data', () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <FilesList filesList={[file1]} handleImageDelete={() => {}} />
      </DndProvider>
    );
    const imgItem = screen.getByTestId('imgItem');

    expect(screen.getByTestId('imgItem')).toBeInTheDocument();
    expect(imgItem).toHaveTextContent('image_1.png');
    expect(asFragment()).toMatchSnapshot();
  });
});
