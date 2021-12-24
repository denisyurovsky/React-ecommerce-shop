import React from 'react';

import PasswordForm from './PasswordForm';

export default {
  title: 'AuthModal/PasswordField',
  component: PasswordForm,
  argTypes: { onChange: { action: 'Typing...' } },
};

const Template = (args) => <PasswordForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  password: 'password',
  isError: false,
  disabled: false,
  errorMessage: 'Incorrect login or password',
};

export const Error = Template.bind({});
Error.args = {
  password: 'wrongpassword',
  isError: true,
  disabled: false,
  errorMessage: 'Incorrect login or password',
};

export const Disabled = Template.bind({});
Disabled.args = {
  password: 'password',
  isError: false,
  disabled: true,
  errorMessage: 'Incorrect login or password',
};
