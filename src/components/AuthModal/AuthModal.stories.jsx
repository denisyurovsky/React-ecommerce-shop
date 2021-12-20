import React from 'react';

import AuthModal from './AuthModal';

export default {
  title: 'AuthModal/Modal',
  component: AuthModal,
  argTypes: {
    registerUser: { action: 'Sending post request' },
    loginUser: { action: 'Sending post request' },
  },
};

const Template = (args) => <AuthModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  registerStatus: 'idle',
  loginStatus: 'idle',
  errorMessage: 'Incorrect password or login',
};

export const Loading = Template.bind({});
Loading.storyName = 'Loading login';
Loading.args = {
  registerStatus: 'idle',
  loginStatus: 'loading',
  errorMessage: 'Incorrect password or login',
};

export const Error = Template.bind({});
Error.storyName = 'Error in registration';
Error.args = {
  registerStatus: 'failed',
  loginStatus: 'idle',
  errorMessage: 'Incorrect password or login',
};

export const Succed = Template.bind({});
Succed.storyName = 'Successful login';
Succed.args = {
  registerStatus: 'idle',
  loginStatus: 'succeeded',
  errorMessage: 'Incorrect password or login',
};

export const Locked = Template.bind({});
Locked.storyName = 'Locked login';
Locked.args = {
  registerStatus: 'idle',
  loginStatus: 'locked',
  errorMessage: 'Many wrong attempts, try again later',
};
