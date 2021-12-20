import React from 'react';

import Registration from './Registration';

export default {
  title: 'AuthModal/Registration',
  component: Registration,
  argTypes: { sendForm: { action: 'Sending form' } },
};

const Template = (args) => <Registration {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.storyName = 'Server error';
Error.args = {
  status: 'failed',
  errorMessage: 'User already exists',
};

export const Loading = Template.bind({});
Loading.args = {
  status: 'loading',
};
