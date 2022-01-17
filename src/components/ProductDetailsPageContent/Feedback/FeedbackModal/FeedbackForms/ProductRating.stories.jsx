import React from 'react';

import ProductRating from './ProductRating';

export default {
  title: 'rating',
  component: ProductRating,
};

const Template = (args) => <ProductRating {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: () => {},
  value: 4,
};

export const Trio = Template.bind({});
Default.args = {
  onChange: () => {},
  value: 3,
};
export const Duo = Template.bind({});
Default.args = {
  onChange: () => {},
  value: 2,
};
