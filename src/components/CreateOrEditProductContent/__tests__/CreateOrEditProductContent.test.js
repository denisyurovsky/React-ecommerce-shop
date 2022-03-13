import userEvent from '@testing-library/user-event';
import React from 'react';

import convertDescription from '../../../helpers/convertDescriptionToObj';
import { categories } from '../../../test-utils/dto/categoriesDto';
import { productForPDP } from '../../../test-utils/dto/productsDto';
import renderWith, { screen } from '../../../test-utils/renderWith';
import CreateOrEditProductContent from '../CreateOrEditProductContent';

window.location = 'admin/products/5/edit';

const editProduct = {
  ...productForPDP,
  description: convertDescription(productForPDP.description),
};

const preloadedState = {
  categories: {
    data: categories.map((el) => el.name),
  },
};

describe('CreateOrEditProductContent snapshot', () => {
  it('should take a snapshot with predefined data', () => {
    const { asFragment } = renderWith(
      <CreateOrEditProductContent
        product={editProduct}
        onCancel={() => {}}
        onSubmit={() => {}}
        isEditPage={false}
      />,
      preloadedState
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Buttons functionality on edit page', () => {
  const onCancel = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    renderWith(
      <CreateOrEditProductContent
        product={editProduct}
        onCancel={onCancel}
        onSubmit={onSubmit}
        isEditPage={true}
      />,
      preloadedState
    );
  });

  it('should disable edit btn by default', () => {
    expect(screen.getByRole('button', { name: /edit/i }).disabled).toBe(true);
  });

  it('should enable edit btn after valid changes', () => {
    userEvent.type(screen.getByLabelText(/name/i), 'sdf');

    expect(screen.getByRole('button', { name: /edit/i }).disabled).toBe(false);
  });

  it('should disable edit btn after invalid changes', () => {
    const price = editProduct.price;

    userEvent.type(screen.getByLabelText(/^discount/i), `${price + 1}`);
    userEvent.type(screen.getByLabelText(/^discount/i), `1`);

    expect(screen.getByRole('button', { name: /edit/i }).disabled).toBe(true);
  });

  it('should call submit callback', () => {
    userEvent.type(screen.getByLabelText(/name/i), 'y{backspace}');
    userEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should call cancel callback', () => {
    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalled();
  });
});
